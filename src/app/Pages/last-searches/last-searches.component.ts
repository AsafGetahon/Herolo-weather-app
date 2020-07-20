import { Component, OnInit } from "@angular/core";
import * as data from "src/assets/last-searched.json";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Component({
  selector: "app-last-searches",
  templateUrl: "./last-searches.component.html",
  styleUrls: ["./last-searches.component.scss"],
})
export class LastSearchesComponent implements OnInit {
  lastSearches = data;
  data: any;
  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.data = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/last-searched.json");
  }
  ngOnInit() {
    this.data;
  }
}
