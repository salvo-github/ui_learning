function alert(x) {
  console.log(x);
}

function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test", 'prova'); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

function delay(f, delay) {


  return function (...args) {
    console.log(`a: ${args}`);
    return setTimeout(() => {
      f.call(this, ...args);
    }, delay);
  }
}
