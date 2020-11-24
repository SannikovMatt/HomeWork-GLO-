'use strict';

//************************************************Функции 

//
function getType(data) {

    console.log(typeof (data));
}



//Объявить функцию getExpensesMonth. 
//Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(costs1, consts2) {

    return costs1 + consts2;
}


// Объявить функцию getTargetMonth.
// Подсчитывает за какой период будет достигнута цель,
// зная результат месячного накопления 
//(accumulatedMonth) и возвращает результат

function getTargetMonth(accumulatedMonthP, missionP) {

    return missionP / accumulatedMonthP;


}
//Объявить функцию getAccumulatedMonth. 
//Функция возвращает Накопления за месяц (Доходы минус расходы)

function getAccumulatedMonth(moneyP, cost1, cost2) {

    return moneyP - getExpensesMonth(cost1, cost2);

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
let money = 2100,
    income = 'Аренда',
    addExpenses = 'интернет, аренда, машина',
    deposit = true,
    mission = 10000,
    period = 12;//Месяцев


//Расходы и Накопления
let expenses1,
    amaunt1,
    expenses2,
    amaunt2,
    accumulatedMonth,
    budgetDay;


let addExpensesArr = addExpenses.split(', ');





//*******************************ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ************************* */
// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = parseFloat(prompt('Напишите числом ваш месячный доход', 0));

/*Спросить у пользователя “Перечислите возможные расходы за 
рассчитываемый период через запятую” сохранить в переменную addExpenses (пример: "Квартплата, проездной, кредит")*/
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кураторство');


/*Спросить у пользователя “Есть ли у вас депозит в банке?” 
и сохранить данные в переменной deposit (булево значение true/false)*/
deposit = confirm('Есть ли в у вас депозит в банке?');


// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
expenses1 = prompt('Введите обязательную статью расходов?', 'газ');
amaunt1 = parseFloat(prompt('Во сколько это обойдется?', 1000));

expenses2 = prompt('Введите обязательную статью расходов?', 'вода');
amaunt2 = parseFloat(prompt('Во сколько это обойдется?', 1000));


accumulatedMonth = getAccumulatedMonth(money,amaunt1,amaunt2);
//*******************************КОНЕЦ ВЗАИМОДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЕМ************************* */




//*******************************ВЫВОД В КОНСОЛЬ************************* */

//Типы данных
getType(money);
getType(income);
getType(deposit);


// Расходы за месяц вызов getExpensesMonth
console.log("Расходы за месяц: " + getExpensesMonth(amaunt1, amaunt2));


// Вывод возможных расходов в виде массива (addExpenses)
console.log(addExpensesArr);


//Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
console.log("Вы достигните своей цели через: "  + getTargetMonth(accumulatedMonth, mission) + " месяцев" );

// budgetDay высчитываем исходя из значеесячного накопления (accumulatedMonth)

budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день " + Math.floor(budgetDay));

//- вызов функции getStatusIncome
getStatusIncome(budgetDay);





























