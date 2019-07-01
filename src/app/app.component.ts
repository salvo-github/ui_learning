import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'course';
  showre: boolean = true;
  showsl: boolean = false;

  showRecipes() {
    this.showre = true;
    this.showsl = false;
  }

  showShoppingList() {
    this.showre = false;
    this.showsl = true;
  }
}
