import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() showRecipes = new EventEmitter<Boolean>();
  @Output() showShoppingList = new EventEmitter<Boolean>();

  constructor() {}

  ngOnInit() {}

  goToRecipes() {
    this.showRecipes.emit(true);
  }

  goToShoppingList() {
    this.showShoppingList.emit(true);
  }
}
