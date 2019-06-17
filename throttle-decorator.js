function alert(params) {
  console.log(params);
}

function throttle(f, ms) {
  let isCooldown = false;
  let lastRun = false;

  let lastArgs;

  return function wrapper() {

    if (isCooldown) {
      lastRun = true;
      lastArgs = arguments;
      return
    };

    isCooldown = true;

    f.apply(this, arguments);

    setTimeout(() => {
      isCooldown = false;
      if (lastRun) {
        wrapper.apply(this, lastArgs);
        lastArgs = null;
      }
    }, ms);

  }
}
