// Function.prototype.defer = function (ms) {
//   return (...args) => {
//     setTimeout(() => this(...args), ms);
//   }
// };

Function.prototype.defer = function (ms) {
  return function () {
    setTimeout(this, ms, ...arguments);
  }.bind(this);
};

// check it
function f(a, b) {
  console.log(a + b);
}

f.defer(1000)(1, 2); // shows 3 after 1 sec
