import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-forcast",
  templateUrl: "./forcast.component.html",
  styleUrls: ["./forcast.component.scss"],
})
export class ForcastComponent implements OnInit {
  constructor() {}
  @Input() weather: any;

  ngOnInit() {}
}
