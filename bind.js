'use strict';

function alert(params) {
  console.log(params);
}

function prompt() {
  console.log('ars');
}

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword.bind(user)(user.loginOk, user.loginFail);
