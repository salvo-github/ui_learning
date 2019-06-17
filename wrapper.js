function alert(string) {
  console.log(string);
}

let spyobj = {

  spy(func) {

    wrapper.calls = [];

    function wrapper() {
      wrapper.calls.push(Array.from(arguments));
      // func.apply(this, arguments)
      func(arguments);
    }


    return wrapper;
  }
}

// function work(a, b) {
//   alert(a + b); // work is an arbitrary function or method
// }

let work = {
  now() {
    return this.check() + 5;
  },
  check() {
    return 7;
  }
}

work.now = spyobj.spy(work.now);

let obj = {
  run() {
    work.now(1, 2); // 3
  }
}

console.log(obj.run());

let nested = obj.run;

nested();

// function moreNested() {
//   return obj.run();
// }



work.now(1, 2); // 3
work.now(4, 5); // 9

console.log(work.now.calls);

for (let args of work.now.calls) {
  alert('call:' + args.join()); // "call:1,2", "call:4,5"
}
