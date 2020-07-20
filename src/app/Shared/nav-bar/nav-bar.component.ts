import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/Services/config.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  constructor(private settingService: ConfigService) {}

  ngOnInit() {}

  switchTheme() {
    return this.settingService.switchTheme();
  }

  switchTemp() {
    return this.settingService.switchUnit();
  }
}
