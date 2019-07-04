import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  onSelectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'testamelo recipe',
      'desc recipe',
      'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
      [
        new Ingredient('apple', 1),
        new Ingredient('banana', 2),
        new Ingredient('yogurt', 3),
      ]
    ),
    new Recipe(
      'test recipe',
      'desc recipe',
      'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
      [
        new Ingredient('apple', 1),
        new Ingredient('banana', 2),
        new Ingredient('yogurt', 3),
      ]
    )
  ];

  getRecipe() {
    return this.recipes.slice();
  }

  constructor() {}
}
