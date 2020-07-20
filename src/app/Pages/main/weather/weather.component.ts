import { Component, OnInit, Input } from "@angular/core";
import { Observable, from } from "rxjs";
import { Location } from "src/app/Models/location/location";
import { GeoLocationService } from "src/app/Services/geo-location.service";
import { ConfigService } from "src/app/Services/config.service";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"],
})
export class WeatherComponent implements OnInit {
  @Input() weather$: any;
  city$: Observable<Location>;
  isMetric$: Observable<boolean>;

  constructor(
    private locationService: GeoLocationService,
    private settingService: ConfigService
  ) {
    this.isMetric$ = this.settingService.isMetric();
    this.city$ = this.locationService.currentLocation;
  }

  ngOnInit() {}
}
