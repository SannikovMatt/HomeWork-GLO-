'use strict';

//************************************************Функции 

//


function isNumber(n) {

    return !isNaN(parseFloat(n)) && isFinite(n);

}

let money;
function start() {
    let money;
    do { money = parseFloat(prompt('Напишите числом ваш месячный доход')); }
    while (!isNumber(money));

    return money;

}



let appData = {

    income: {},
    addIncome: [],
    expenses: {},
    addExpensesArr: [],
    deposit: false,
    mission: 10000,
    period: 12,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        money = start();


        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кураторство');
        appData.addExpensesArr = appData.addExpenses.split(', ');
        appData.deposit = confirm('Есть ли в у вас депозит в банке?');


        let rightSum;

        for (let i = 0; i < 2; i++) {


            let answer = prompt('Введите обязательную статью расходов?', 'газ');


            this.expenses[answer] = rightSum;

            do { rightSum = prompt('Во сколько это обойдется ' + answer + '?'); }
            while (!isNumber(rightSum));
            this.expenses[answer] = rightSum;

        }
    },


    getExpensesMonth: function () {
        let sum = 0;

        for (let item in appData.expenses) {

            sum += parseFloat(appData.expenses[item]);
        }
        appData.expensesMonth = sum;
        return sum;
    },

    getBudget: function () {

        appData.budgetMonth = money - appData.getExpensesMonth();
        appData.budgetday = appData.budgetMonth / 30;



    },

    getTargetMonth: function () {
        appData.getBudget();

        let period = appData.mission / appData.budgetMonth;

        if (period <= 0) {

            return "Цель не будет достигнута";
        }
        return "Вы достигните своей цели через: " + Math.floor(period) + " месяцев";

    },

    getStatusIncome: function () {
        // Написать конструкцию условий (расчеты приведены в рублях)
        let budgetDayP = appData.budgetday;
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



};




/*******************************ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ************************* */

appData.asking();
//*******************************КОНЕЦ ВЗАИМОДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЕМ************************* */



//*******************************ВЫВОД В КОНСОЛЬ************************* */


console.log("Расходы за месяц: " + appData.getExpensesMonth());

console.log(appData.getTargetMonth());

appData.getStatusIncome();




console.log("Наша программа включает в себя данные: " );

for(let key in appData){console.log("Ключ: " + key + " Значение "+appData[key]);}

