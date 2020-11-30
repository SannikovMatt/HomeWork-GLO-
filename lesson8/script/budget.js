'use strict';

//************************************************Функции 

//


function isNumber(n) {

    return !isNaN(parseFloat(n)) && isFinite(n);

}

function fieldsValidation(question, neededType) {

    let itemToValid;

    if (neededType === 'number') {

        do {
            itemToValid = prompt(question[0], question[1]);
            if (itemToValid === null) { return; }
        }
        while (!isNumber(itemToValid));
        return itemToValid;
    }

    if (neededType ===  'string') {

        do {
            itemToValid = prompt(question[0], question[1]);
            if (itemToValid === null) { return; }
        }
        while (typeof itemToValid !== typeof ("string") || !isNaN(itemToValid));

        return itemToValid;
    }




}


let money;
function start() {
    let money;
    money = fieldsValidation(['Напишите числом ваш месячный доход', 50000],'number'); 
    

    return money;

}



let appData = {

    income: {},
    addIncome: [],
    expenses: {},
    addExpensesArr: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 10000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        money = start();

        if (confirm('Есть ли у вас дополнительный доход')) {

            let itemIncome,
                cashIncome;

            itemIncome = fieldsValidation(['Какой у вас дополнительный заработок', 'фриланс'], 'string');
            cashIncome = fieldsValidation(['Сколько вы зарабатываете на  ' + itemIncome + ' ?', 10000], 'number');

            appData.income[itemIncome] = cashIncome;

        }

        let expenses;
        expenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кураторство, фриланс,такси');
        appData.addExpensesArr = expenses.split(',');

        

        appData.deposit = confirm('Есть ли в у вас депозит в банке?');


        let rightSum;

        for (let i = 0; i < 2; i++) {


            let answer = fieldsValidation(['Введите обязательную статью расходов?', 'газ'], 'string');

            rightSum = fieldsValidation(['Во сколько это обойдется ' + answer + '?', 550], 'number');





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

        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
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


    },
    getInfoDeposit: function () {

        if (appData.deposit) {

            appData.percentDeposit = fieldsValidation(['Какой годовой процент ?', 10], 'number');

            appData.moneyDeposit = fieldsValidation(['Какая сумма заложена ', 10000], 'number');

        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;

    }




};




/*******************************ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ************************* */

appData.asking();
//*******************************КОНЕЦ ВЗАИМОДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЕМ************************* */



//*******************************ВЫВОД В КОНСОЛЬ************************* */


console.log("Расходы за месяц: " + appData.getExpensesMonth());

console.log(appData.getTargetMonth());

appData.getStatusIncome();




//console.log("Наша программа включает в себя данные: " );

//for(let key in appData){console.log("Ключ: " + key + " Значение "+appData[key]);}


let temp = '';
for (let item of appData.addExpensesArr) {
    item = item.trim();
    if (appData.addExpensesArr[appData.addExpensesArr.length-1] === item) {

        temp += item.substring(0, 1).toUpperCase() + item.substring(1);

    } else {
        temp += item.substring(0, 1).toUpperCase() + item.substring(1) + ", ";
    }




}
console.log(temp);