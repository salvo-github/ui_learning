import { OnInit, Component, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Input('ingredients') ingredients: Ingredient[];

  constructor() {}

  ngOnInit() {}
}
