import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { GeoLocationService } from "./Services/geo-location.service";
import { ConfigService } from "./Services/config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  theme$: Observable<any>;

  constructor(
    private locationService: GeoLocationService,
    private settingService: ConfigService
  ) {
    this.locationService.getDeviceLocation().subscribe();
    this.theme$ = this.settingService.isDarkTheme();
  }
  ngOnInit() {}
}
