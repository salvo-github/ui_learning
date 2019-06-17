function debounce(f, ms) {

  function evaluate() {
    if (evaluate.lastcall === undefined || Date.now() - evaluate.lastcall > ms) {
      evaluate.lastcall = Date.now();
      return f.apply(this, arguments);
    }
  }

  evaluate.lastcall;

  return evaluate;
}

function debounce(f, ms) {

  let isCooldown = false;

  return () => {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;
    }, ms);
  }
}
let log = '';

function f(a) {
  log += a;
}

f = debounce(f, 1000);

f(1); // runs at once
f(2); // ignored

setTimeout(() => f(3), 100); // ignored (too early)
setTimeout(() => f(4), 1100); // runs (1000 ms passed)
setTimeout(() => f(5), 1500); // ignored (less than 1000 ms from the last run)


function foo() {
  'use strict';
  console.log("Simple function call")
  // console.log(this === window);
}
foo();
