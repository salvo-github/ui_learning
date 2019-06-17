let div = document.querySelector('.showcoords');

let ul = document.createElement('ul');

const fieldSquare = document.querySelector('#field')

const squareBounding = fieldSquare.getBoundingClientRect();

let li01 = document.createElement('li');
li01.textContent = `${squareBounding.left} : ${squareBounding.top}`;

let li02 = document.createElement('li');
li02.textContent = `${squareBounding.right} : ${squareBounding.bottom}`;

let li03 = document.createElement('li');
li03.textContent = field

let li04 = document.createElement('li');
li04.textContent = `${squareBounding.right}:${squareBounding.bottom}`;

ul.append(li01);
ul.append(li02);

div.append(ul);
