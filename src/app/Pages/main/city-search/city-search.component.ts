import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { GeoLocationService } from "src/app/Services/geo-location.service";
import { Location } from "src/app/Models/location/location";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as savedData from "src/assets/last-searched.json";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-city-search",
  templateUrl: "./city-search.component.html",
  styleUrls: ["./city-search.component.scss"],
})
export class CitySearchComponent implements OnInit {
  @Output() cityKey = new EventEmitter<string>();
  public cities: Location[];
  public city: Location;
  public text$: string;
  public url: string = "../assets/last-searched.json";
  searchedCities: any = (savedData as any).default;

  constructor(
    private locationService: GeoLocationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cities = [];
    this.getCities();
  }

  formatter = (city: Location) =>
    city.LocalizedName + ", " + city.Country.LocalizedName || "";

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.cities
              .filter((v) =>
                v.LocalizedName.toLowerCase().startsWith(
                  term.toLocaleLowerCase()
                )
              )
              .splice(0, 5)
      )
    );

  citySelected(city) {
    this.searchedCities.push(city.item);
    this.http.put(environment.lastSearched, city.item).subscribe(
      (data) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    return this.locationService.setCurrentCity(city.item);
  }

  getCities(): void {
    this.locationService
      .searchAutocomplete(this.text$)
      .subscribe((cities: Location[]) => {
        this.cities = cities;
      });
  }
}
