import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss']
})
export class BindComponent implements OnInit {

  username: string;

  constructor() { }

  ngOnInit() {
  }

  resetUsername() {
    this.username = '';
  }

}
