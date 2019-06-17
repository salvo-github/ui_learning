class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log('eat now');
  }
}

class Rabbit extends Animal {
  run() {
    console.log('run now');
  }
}


let rabbit = new Rabbit('little');

console.log(Rabbit.prototype);
