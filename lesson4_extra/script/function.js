
'use strict';


let checkIt = prompt("Введите строку которую хотите обрезать", "Введите строку которую хотите обрезать");



function cutString(someString) {

    // Если в качестве аргумента передана не строка - функция оповещает об этом пользователя
    if (typeof (someString) !== typeof ('string')) {

        alert('Введена не строка');
        return;
    }else  if (someString.length > 30) {

        someString = someString.substring(0, 30) + '...   ';
    }
    //— В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
    someString = someString.trim();

    return someString;
}



console.log(cutString(checkIt));