// if (!String.prototype.repeat) { // if there's no such method
// add it to the prototype

let repeat = function repeat(n) {
  // repeat the string n times

  // actually, the code should be a little bit more complex than that
  // (the full algorithm is in the specification)
  // but even an imperfect polyfill is often considered good enough
  // return
  let array = new Array(n + 1);
  let joined = array.join(this);

  return joined;
};
// }

console.log("La".repeat(3)); // LaLaLa
