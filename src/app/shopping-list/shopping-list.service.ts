import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  onChangeIngredients: EventEmitter<Ingredient[]> = new EventEmitter<
    Ingredient[]
  >();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {}

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  saveIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.onChangeIngredients.emit(this.getIngredients());
  }

  saveIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.onChangeIngredients.emit(this.getIngredients());
  }
}
