function Rabbit() {}
Rabbit.prototype = {
  // constructor: Rabbit,
  sleep: true
};

let rabbit = new Rabbit();

function Rabbit2() {}

Rabbit.prototype = {};

// Rabbit.prototype = {};

console.log(JSON.stringify(rabbit.sleep)); // ?


function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

console.log(rabbit.eats); // ?
