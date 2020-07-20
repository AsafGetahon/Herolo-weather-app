import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { GeoLocationService } from "src/app/Services/geo-location.service";
import { DbService } from "src/app/Services/db.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  weather$: Observable<any>;
  currentLocation: Observable<any>;
  cityKey: Observable<any>;

  constructor(private locationService: GeoLocationService) {}

  ngOnInit() {
    this.weather$ = this.locationService.getWeatherData().pipe(
      map((data) => {
        return data;
      })
    );
  }

  onKeyChange(cityKey) {
    this.cityKey = cityKey;
  }
  onAddToFavorites() {
    const currentLocation = JSON.parse(localStorage.getItem("currentLocation"));
    return this.locationService.toggleFavorite(currentLocation);
  }

  isFavorite() {
    const currentLocation = JSON.parse(localStorage.getItem("currentLocation"));
    const fav = JSON.parse(localStorage.getItem("favorites"));
    return fav && fav[currentLocation.Key];
  }
}
