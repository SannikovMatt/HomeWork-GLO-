'use strict';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function getNumbers() {


    let tempAr = Array(6);

    for (let i = 0; i < tempAr.length; i++) {

        tempAr[i] = prompt('Введите многозначные числа еще ' + i + ' раз', getRndInteger(1000, 9000));

    }

    return tempAr;
}


Array.prototype.getNumbFromArr = function (first, second) {

    let tempArr = this;
    first = first.toString();
    second = second.toString();

    for (let i = 0; i < tempArr.length; i++) {

        if ((tempArr[i].substring(0, 1) === first) || (tempArr[i].substring(0, 1) === second)) {

            console.log(tempArr[i]);
        }

    }


};


//Получаешь числа или вводишь сам
let arr = getNumbers();
//В параметер введи числа с которых должны начинаться выводимые числа
arr.getNumbFromArr(2, 4);


//2


//Проверка простое ли число
function isPrime(n) {



    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }


    }
    return n > 1;
}

//Вычислить простые числа до определенного числа
function getPrimeNumber(tillWhich) {

    let tempArr = [];
    let counter = 0;
    for (let i = 0; tillWhich > i; i++) {

        if (isPrime(i)) {

            tempArr[counter] = i;
            counter++;
        }

    }
    return tempArr;
}


//Вывести в консоль числа массива с делителями
function getConsolDividers(arr) {


    for (let i = 0; arr.length > i; i++){
        console.log('Делители числа ' + arr[i] + ': 1 и '  + arr[i]);
    }

}

let number = +prompt('Введите число до которого нужно проверить простые числа',100);
let primes = getPrimeNumber(number);

getConsolDividers(primes);





