import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DbService {
  constructor() {}

  getData(value): Observable<any> {
    return of(JSON.parse(localStorage.getItem(value)));
  }

  storeData(key, value): Observable<any> {
    localStorage.setItem(key, JSON.stringify(value));
    return of(value);
  }
}
