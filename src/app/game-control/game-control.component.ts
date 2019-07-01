import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.scss"]
})
export class GameControlComponent implements OnInit {
  @Output() afterStarted = new EventEmitter<number>();
  increment: number = 0;
  isStarted: boolean = false;
  gameLoop;

  constructor() {}

  ngOnInit() {}

  // startGame(): void {
  //   if (this.isStarted) return;
  //   this.isStarted = true;
  //   this.gameLoop = setInterval(() => {
  //     this.afterStarted.emit(this.increment);
  //     this.increment++;
  //   }, 1000);
  // }



  startGame(): void {
    if (this.isStarted) return;
    this.isStarted = true;
    this.gameLoop = setInterval(function incrementLoop() {
      this.afterStarted.emit(this.increment++);
      return incrementLoop.bind(this);
    }.call(this), 1000);
  }

  stopGame(): void {
    clearInterval(this.gameLoop);
    this.isStarted = false;
    this.increment = 0;
  }
}
