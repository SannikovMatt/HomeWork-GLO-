
const books =document.querySelectorAll('.books');
const bookDiv = document.querySelectorAll('.book');
const adw = document.querySelector('.adv');

//Восстановить порядок книг. 
books[0].innerHTML='';

const book1 = bookDiv[1];
const book2 = bookDiv[0];
const book3 = bookDiv[4];
const book4 = bookDiv[3];
const book5 = bookDiv[5];
const book6 = bookDiv[2];



books[0].insertAdjacentElement('afterbegin' ,book1);
books[0].append(book2);
books[0].append(book3);
books[0].append(book4);
books[0].append(book5);
books[0].append(book6);


//Заменить картинку заднего фона на другую из папки image
const body = document.querySelector('body');
body.style.backgroundImage ='url(./image/you-dont-know-js.jpg)';




//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const ref = book3.querySelector('a');
ref.innerHTML='Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
adw.remove();

//Восстановить порядок глав во второй и пятой книге 
//(внимательно инспектируйте индексы элементов, поможет dev tools)
let chapters = book2.querySelectorAll('li');

let chapter1 = chapters[3];
let chapter2 = chapters[6];
let chapter3 = chapters[8];
let chapter4 = chapters[4];
let chapter5 = chapters[5];
let foreword = chapters[1];

let addA = chapters[7];
let addB = chapters[9];
let addC = chapters[2];
let addD = chapters[10];


foreword.after(chapter1);
chapter1.after(chapter2);
chapter2.after(chapter3);
chapter3.after(chapter4);
chapter4.after(chapter5);
chapter5.after(addA);
addA.after(addB);
addB.after(addC);
addC.after(addD);



let b5chapters = book5.querySelectorAll('li');

let b5chapter1 = b5chapters[9];
let b5chapter2 = b5chapters[3];
let b5chapter3 = b5chapters[4];
let b5chapter4 = b5chapters[2];
let b5chapter5 = b5chapters[6];
let b5chapter6 = b5chapters[7];
let b5foreword = b5chapters[1];

let b5addA = b5chapters[5];
let b5addB = b5chapters[8];
let b5addC = b5chapters[10];


b5foreword.after(chapter1);
b5chapter1.after(b5chapter2);
b5chapter2.after(b5chapter3);
b5chapter3.after(b5chapter4);
b5chapter4.after(b5chapter5);
b5chapter5.after(b5chapter6);
b5chapter6.after(b5addA);
b5addA.after(b5addB);
b5addB.after(b5addC);



let list = book6.querySelectorAll('ul');
list[0].insertAdjacentHTML('beforeend' ,' <li> Глава 8: За пределами ES6</li>');
 
let fieldsLI =list[0].querySelectorAll('li');

fieldsLI[10].after(fieldsLI[9]);











