let num = 266219;
let numStr = num.toString();//Переводим число в строку
let sum =0;



for (let i = 0 ; numStr.length > i ; i++)// Перебираем строку умножаем числа.
{
    if(sum == 0) sum = +numStr[i];
    else sum *= +numStr[i];

}

console.log(sum);//Полученное число


let changedNum = sum ** 3; //Возводим число в 3 степень
console.log(changedNum);



changedNum = changedNum.toString();

console.log(changedNum.substring(0,2));//Выводим первые 2 числа

