'use strict';

//************************************************Функции 

//
function getType(data) {

    console.log(typeof (data));
}


function isNumber(n) {

    return !isNaN(parseFloat(n)) && isFinite(n);

}

function start() {
    let money;
    do{money = parseFloat(prompt('Напишите числом ваш месячный доход'));}
    while (!isNumber(money));       
    
  return money;

}



//Объявить функцию getExpensesMonth. 
//Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth() {
    let sum = 0;
    let rightSum;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', 'газ');

        do { rightSum = prompt('Во сколько это обойдется ' + expenses[i] + '?'); }
        while (!isNumber(rightSum));

        sum += parseFloat(rightSum);
    }

    return sum;
}







// Объявить функцию getTargetMonth.
// Подсчитывает за какой период будет достигнута цель,
// зная результат месячного накопления 
//(accumulatedMonth) и возвращает результат

function getTargetMonth(accumulatedMonthP, missionP) {

    let period = missionP / accumulatedMonthP;

    if (period <= 0) {
        
        return "Цель не будет достигнута";
    }
    return "Вы достигните своей цели через: " + Math.floor(period) + " месяцев";

}
//Объявить функцию getAccumulatedMonth. 
//Функция возвращает Накопления за месяц (Доходы минус расходы)

function getAccumulatedMonth(moneyP, expensesAmaunt) {

    return moneyP - expensesAmaunt;

}

function getStatusIncome(budgetDayP) {
    // Написать конструкцию условий (расчеты приведены в рублях)

    //Если budgetDay больше 1200, то “У вас высокий уровень дохода”
    if (budgetDayP >= 1200) {
        console.log('У вас высокий уровень дохода');


        // Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
    } else if (budgetDayP >= 600 && budgetDayP <= 1200) {
        console.log('У вас средний уровень дохода');


        // Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение 
        //“К сожалению у вас уровень дохода ниже среднего”
    } else if (budgetDayP >= 0 && budgetDayP <= 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');

        //Если отрицательное значение то вывести “Что то пошло не так”
    } else if (budgetDayP < 0) {

        console.log('Что то пошло не так');
    }


}









//Общие данные
let money,
    income = 'Аренда',
    addExpenses = 'интернет, аренда, машина',
    deposit = true,
    mission = 10000,
    period = 12;//Месяцев


//Расходы и Накопления
let accumulatedMonth,
    budgetDay,
    expensesAmaunt,
    addExpensesArr,
    expenses = [];








//*******************************ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ************************* */
// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = start();

/*Спросить у пользователя “Перечислите возможные расходы за 
рассчитываемый период через запятую” сохранить в переменную addExpenses (пример: "Квартплата, проездной, кредит")*/
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кураторство');
addExpensesArr = addExpenses.split(', ');

/*Спросить у пользователя “Есть ли у вас депозит в банке?” 
и сохранить данные в переменной deposit (булево значение true/false)*/
deposit = confirm('Есть ли в у вас депозит в банке?');


// Спросить у пользователя по 2 раза каждый вопрос и записать ответы 

expensesAmaunt = getExpensesMonth();



accumulatedMonth = getAccumulatedMonth(money, expensesAmaunt);
//*******************************КОНЕЦ ВЗАИМОДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЕМ************************* */




//*******************************ВЫВОД В КОНСОЛЬ************************* */




//Типы данных
getType(money);
getType(income);
getType(deposit);


// Расходы за месяц


console.log("Расходы за месяц: " + expensesAmaunt);


// Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpensesArr);


//Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log(getTargetMonth(accumulatedMonth, mission));

// budgetDay высчитываем исходя из значеесячного накопления (accumulatedMonth)

budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день " + Math.floor(budgetDay));

//- вызов функции getStatusIncome
getStatusIncome(budgetDay);





























