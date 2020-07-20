import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MainComponent } from "./pages/main/main.component";
import { LastSearchesComponent } from "./pages/last-searches/last-searches.component";
import { CitySearchComponent } from "./pages/main/city-search/city-search.component";
import { ForcastComponent } from "./pages/main/forcast/forcast.component";
import { WeatherComponent } from "./pages/main/weather/weather.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    LastSearchesComponent,
    CitySearchComponent,
    ForcastComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
