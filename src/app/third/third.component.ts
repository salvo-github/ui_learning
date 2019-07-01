import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-third",
  templateUrl: "./third.component.html",
  styleUrls: ["./third.component.scss"]
})
export class ThirdComponent implements OnInit {
  displayDetails: boolean = false;
  dispalyDetailsClick: Date[] = [];

  constructor() { }

  ngOnInit() { }

  onDisplayDetails(): void {
    if (!this.displayDetails) this.dispalyDetailsClick.push(new Date());
    this.displayDetails = !this.displayDetails;
  }
}
