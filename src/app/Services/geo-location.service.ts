import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { Location } from "src/app/Models/location/location";
import { ToastrService } from "ngx-toastr";
import { ForecastService } from "./forecast.service";
import { DbService } from "./db.service";

@Injectable({
  providedIn: "root",
})
export class GeoLocationService {
  currentLocation: BehaviorSubject<any>;
  geopositionUrl = environment.geoLocationUrl;
  autocompleteUrl = environment.autoCompleteUrl;

  constructor(
    private toastr: ToastrService,
    private weatherService: ForecastService,
    private http: HttpClient,
    private dbService: DbService
  ) {
    const initLocation = this.dbService.getData("currentLocation");
    this.currentLocation = new BehaviorSubject(initLocation);
  }

  getDeviceCoordinates(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getDeviceLocation() {
    return from(this.getDeviceCoordinates()).pipe(
      switchMap((coordinates) => {
        return (
          coordinates &&
          this.searchLocation(coordinates).pipe(
            map((data) => {
              this.dbService.storeData("deviceLocation", data);
              const currentLocation = localStorage.getItem("currentLocation");
              if (!currentLocation && data) {
                this.dbService.storeData("currentLocation", data);
                this.currentLocation.next(data);
              }
              console.log(data);
              return data;
            })
          )
        );
      })
    );
  }

  searchLocation(coordinates) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    };
    const options = {
      httpOptions,
      params: new HttpParams()
        .set("apikey", environment.weatherApiKey)
        .set("q", `${coordinates.lat},${coordinates.lon}`),
    };
    return this.http
      .get<Observable<any>>(`${this.geopositionUrl}`, options)
      .pipe(
        map((location) => {
          return location;
        }),
        catchError((err, caught) => {
          console.log("Toastr error: ", err.message);
          return of(
            this.toastr.error(`Cannot get your location from ${err.url}`),
            { timeOut: 3000 }
          );
        })
      );
  }

  searchAutocomplete(freeText: string): Observable<Location[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }),
    };
    const options = {
      httpOptions,
      params: new HttpParams()
        .set("apikey", environment.weatherApiKey)
        .set("q", `${freeText}`),
    };
    return this.http.get<Location[]>(`${this.autocompleteUrl}`, options).pipe(
      map(
        (res) =>
          (res as Location[]).map((c) => {
            return {
              Key: c.Key,
              LocalizedName: c.LocalizedName,
              Country: {
                LocalizedName: c.Country.LocalizedName,
              },
            };
          }),
        catchError((err) => {
          console.log("Toastr error: ", err.message);
          return of(
            this.toastr.error(`Cannot complete search from ${err.url}`),
            { timeOut: 3000 }
          );
        })
      )
    );
  }

  getWeatherData(): Observable<any> {
    console.log("this.currentLocation", this.currentLocation);
    return this.currentLocation.pipe(
      switchMap((location) => {
        return location
          ? this.weatherService.getWeatherData(location.Key)
          : of({});
      })
    );
  }

  getFavorites(): Observable<any[]> {
    const fav = this.dbService.getData("favorites");
    return fav && of(Object.keys(fav).map((i) => fav[i]));
  }

  toggleFavorite(item) {
    const fav = this.dbService.getData("favorites") || {};
    if (fav[item.Key]) {
      delete fav[item.Key];
    } else {
      fav[item.Key] = item;
    }
    this.dbService.storeData("favorites", fav);
  }

  setCurrentCity(location) {
    this.currentLocation.next(location);
    this.dbService.storeData("currentLocation", location);
  }
}
