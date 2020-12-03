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

    if (neededType === 'string') {

        do {
            itemToValid = prompt(question[0], question[1]);
            if (itemToValid === null) { return; }
        }
        while (typeof itemToValid !== typeof ("string") || !isNaN(itemToValid));

        return itemToValid;
    }




}





const calculate = document.getElementById('start');

let btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
let btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

const checkBoxDepositCheck = document.querySelector('#deposit-check');


let addIncomeField = document.querySelectorAll('.additional_income-item');

//РЕЗУЛЬТАТЫ Правая сторона
let monthBudgetResult = document.getElementsByClassName('result-total budget_month-value')[0];
let dayBudgetResult = document.getElementsByClassName('result-total budget_day-value')[0];
let monthExpensesResult = document.getElementsByClassName('result-total expenses_month-value')[0];
let addIncomeResult = document.getElementsByClassName('result-total additional_income-value')[0];
let addExpensesResult = document.getElementsByClassName('result-total additional_expenses-value')[0];
let incomePeriodResult = document.getElementsByClassName('result-total income_period-value')[0];
let targetMonthResult = document.getElementsByClassName('result-total target_month-value')[0];


////////Поля ввода левой стороны
//Зарплата
const salaryAmaunt = document.querySelector('.salary-amount');

//Дополнительный доход
let incomeItems = document.querySelectorAll('.income-items');
const incomeName = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');

//Обязательные расходы
const expensesName = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');


//Возможные расходы
let addExpensesField = document.querySelector('.additional_expenses-item');

//Цель
let targetAmaunt = document.querySelector('.target-amount');


//Период расчета
let periodSelect = document.querySelector('.period-select');


//Period Conunter
let periodCounter = document.querySelector('.period-amount');






let money;
//ОБЬЕКТ 

let appData = {

    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpensesArr: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {

       if(salaryAmaunt.value === ''){
        e.preventDefault();
        return;
       }
       

        appData.budget = +salaryAmaunt.value;

        console.log('salaryAmaunt: ' + salaryAmaunt.value);

        appData.getExpenses();
        appData.getIncome();

        appData.getExpensesMonth();
        appData.getIncomeMonth();

        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();

    },
    showResult: function () {

        dayBudgetResult.value = appData.budgetDay;
        monthBudgetResult.value = appData.budgetMonth;
        monthExpensesResult.value = appData.expensesMonth;
        addExpensesResult.value = appData.addExpensesArr.join(', ');
        addIncomeResult.value = appData.addIncome.join(', ');
        targetMonthResult.value = Math.ceil(appData.getTargetMonth());
        incomePeriodResult.value = appData.calcPeriod();
        periodSelect.addEventListener('change', appData.showResult);


    },
    addExpensesBlock: function () {


        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {

            btnPlusExpensesAdd.style.display = 'none';
        }

    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {

            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {

                appData.expenses[itemExpenses] = cashExpenses;

            }
        });


    },
    addIncomeBlock: function () {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {

            btnPlusIncomeAdd.style.display = 'none';
        }

    },
    getIncome: function () {

        incomeItems.forEach(function (item) {

            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {

                appData.income[itemIncome] = cashIncome;
            }

        });




        // if (confirm('Есть ли у вас дополнительный доход')) {

        //     let itemIncome,
        //         cashIncome;

        //     itemIncome = fieldsValidation(['Какой у вас дополнительный заработок', 'фриланс'], 'string');
        //     cashIncome = fieldsValidation(['Сколько вы зарабатываете на  ' + itemIncome + ' ?', 10000], 'number');

        //     appData.income[itemIncome] = cashIncome;

        // } 

        // for(let key in appData.income){

        //     appData.incomeMonth += +appData.income[key];

        // }
    },
    getAddExpenses: function () {

        let addExpenses = addExpensesField.value.split(',');

        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpensesArr.push(item);

            }

        });
    },
    getAddIncome: function () {
        addIncomeField.forEach(function (item) {

            let itemValue = item.value.trim();
            if (itemValue !== '') {

                appData.addIncome.push(itemValue);
            }
        });

    },
    asking: function () {

        appData.start();








    },


    getExpensesMonth: function () {
        let sum = 0;

        for (let item in appData.expenses) {

            sum += parseFloat(appData.expenses[item]);
        }
        appData.expensesMonth = sum;
        return appData.expensesMonth;
    },
    getIncomeMonth: function () {

        for (let item in appData.income) {

            appData.incomeMonth += parseFloat(appData.income[item]);
        }

    },

    getBudget: function () {

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.getExpensesMonth();
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },

    getTargetMonth: function () {
        return +targetAmaunt.value / appData.budgetMonth;
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;

    },
    changePeriod: function () {
        periodCounter.innerHTML = periodSelect.value;

    }

};


calculate.addEventListener('click', appData.start);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);











// let temp = '';
// for (let item of appData.addExpensesArr) {
//     item = item.trim();
//     if (appData.addExpensesArr[appData.addExpensesArr.length - 1] === item) {

//         temp += item.substring(0, 1).toUpperCase() + item.substring(1);

//     } else {
//         temp += item.substring(0, 1).toUpperCase() + item.substring(1) + ", ";
//     }




// }
// console.log(temp);