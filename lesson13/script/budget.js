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


let clear = document.getElementById('cancel');






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
    start: function (e) {


        if (salaryAmaunt.value === '') {
            e.preventDefault();
            return;
        }



        this.budget = +salaryAmaunt.value;

        console.log('salaryAmaunt: ' + salaryAmaunt.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.blockInput();


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
        clear.addEventListener('click',appData.clearData);



    },
    addExpensesBlock: function () {


        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
        appData.keyEvents();
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
        let title = cloneIncomeItem.querySelector('.income-title').value = '';
        let amount = cloneIncomeItem.querySelector('.income-amount').value = '';


        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
        appData.keyEvents();
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

        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
        this.budgetDay = Math.floor(appData.budgetMonth / 30);

    },

    getTargetMonth: function () {
        return +targetAmaunt.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        // Написать конструкцию условий (расчеты приведены в рублях)
        let budgetDayP = this.budgetday;
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
        return this.budgetMonth * periodSelect.value;

    },
    changePeriod: function () {
        periodCounter.innerHTML = periodSelect.value;

    },
    checkString: function (e) {


        let pattern = /[А-Яа-яЁё0-9\ \, \.]/;

        let key = String.fromCharCode(e.charCode);
        if (key.search(pattern) === -1) {

            e.preventDefault();
        }
    },
    checkNum: function (e) {
        let pattern = /[0-9]/;

        let key = String.fromCharCode(e.charCode);
        if (key.search(pattern) === -1) {

            e.preventDefault();
        }

    },
    keyEvents: function () {

        let num = document.querySelectorAll('[placeholder]');

        num.forEach(function (item) {

            if (item.placeholder === 'Сумма') {
                item.addEventListener('keypress', appData.checkNum);
            }
            if (item.placeholder === 'Наименование') {
                item.addEventListener('keypress', appData.checkString);
            }
        });



    },
    blockInput: function () {


        calculate.style.display = 'none';
        clear.style.display = 'block';

        let inputs = document.getElementsByTagName('input');//.querySelectorAll('[type=text]');

        for (let field of inputs) {

            if (field.getAttribute('type') === 'text') {

                field.setAttribute('readonly', 'readonly');

                btnPlusExpensesAdd.removeEventListener('click', appData.addExpensesBlock);
                btnPlusIncomeAdd.removeEventListener('click', appData.addIncomeBlock);

            }

        }
    },
    clearData: function(){

        let inputs = document.getElementsByTagName('input');

        for (let field of inputs) {

            if (field.getAttribute('type') === 'text') {

                field.value = '';

                appData.income= {},
                appData.incomeMonth= 0,
                appData.addIncome= [],
                appData.expenses={},
                appData.addExpensesArr= [],
                appData.deposit= false,
                appData.percentDeposit= 0,
                appData.moneyDeposit= 0,
                appData.budget= 0,
                appData.budgetDay= 0,
                appData.budgetMonth= 0,
                appData.expensesMonth= 0;
                calculate.style.display = 'block';
                clear.style.display = 'none';
                btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
                btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
                field.removeAttribute('readonly');

                if(expensesItems.length > 1){

                    for(let i=1 ; expensesItems.length > i ;i++){                   
                        expensesItems[i].remove();}
                    if( btnPlusExpensesAdd.style.display === 'none')
                    {
                        btnPlusExpensesAdd.style.display = 'block';
                    }

                }

                
                if(incomeItems.length > 1){

                    for(let i=1 ; incomeItems.length > i ;i++){                   
                    incomeItems[i].remove();}

                    if( btnPlusIncomeAdd.style.display === 'none')
                    {
                        btnPlusIncomeAdd.style.display = 'block';
                    }

                }


            }


    }}

};


appData.keyEvents();

calculate.addEventListener('click', (e) => { appData.start(e); });
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);




targetAmaunt.addEventListener('keypress', appData.checkNum);
salaryAmaunt.addEventListener('keypress', appData.checkNum);












