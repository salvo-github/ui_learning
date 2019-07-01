import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  @Output() recipeDetailToShow = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      "testamelo recipe",
      "desc recipe",
      "https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg"
    ),
    new Recipe(
      "test recipe",
      "desc recipe",
      "https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg"
    )
  ];

  constructor() {}

  ngOnInit() {}
}
