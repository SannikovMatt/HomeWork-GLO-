'use strict';

let money = 2100,
    income = 'Аренда',
    addExpenses = 'интернет, аренда, машина',
    deposit = true,
    mission = 1000000,
    period = 12;//Месяцев 12

console.log(money);
console.log(income);
console.log(deposit);

console.log(addExpenses.length);//Вывел длинну строки

console.log('Период равен: ' + period + ' месяцев');
console.log('Цель заработать: ' + mission + ' евро');



addExpenses = addExpenses.toLowerCase();

let addExpensesArr = addExpenses.split(', ');

console.log(addExpensesArr);


let budgetDay = money / 30;

console.log(budgetDay);





//LESSON ____3


// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = parseFloat(prompt('Напишите числом ваш месячный доход', 0));

/*Спросить у пользователя “Перечислите возможные расходы за 
рассчитываемый период через запятую” сохранить в переменную addExpenses (пример: "Квартплата, проездной, кредит")*/
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');


/*Спросить у пользователя “Есть ли у вас депозит в банке?” 
и сохранить данные в переменной deposit (булево значение true/false)*/
deposit = confirm('Есть ли в у вас депозит в банке?');


// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expenses1 = prompt('Введите обязательную статью расходов?');
let amaunt1 = parseFloat(prompt('Во сколько это обойдется?'));

let expenses2 = prompt('Введите обязательную статью расходов?');
let amaunt2 = parseFloat(prompt('Во сколько это обойдется?'));


/*Вычислить бюджет на месяц, учитывая обязательные расходы, 
сохранить в новую переменную budgetMonth и вывести результат в консоль*/

let budgetMonth = money - amaunt1 - amaunt2;

console.log("Бюджет на месяц: " + budgetMonth);


/* Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, 
вывести в консоль, округляя в большую сторону (методы объекта Math в помощь) */

let reachMissionMonths = Math.ceil(mission / budgetMonth);

console.log("Вы достигнете цель за: " + reachMissionMonths + " месяцев");

/*Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
Вывести в консоль  округлив в меньшую сторону */

budgetDay =  budgetMonth / 30;

console.log("Бюджет на день " + Math.floor(budgetDay));


// Написать конструкцию условий (расчеты приведены в рублях)

//Если budgetDay больше 1200, то “У вас высокий уровень дохода”
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');


    // Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
} else if (budgetDay >= 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');


// Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
} else if (budgetDay >= 0 && budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');

    //Если отрицательное значение то вывести “Что то пошло не так”
}else if(budgetDay < 0){

    console.log('Что то пошло не так');
}





