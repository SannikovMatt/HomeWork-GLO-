'use strict';





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







function AppData() {

    this.income = {},
        this.incomeMonth = 0,
        this.addIncome = [],
        this.expenses = {},
        this.addExpensesArr = [],
        this.deposit = false,
        this.percentDeposit = 0,
        this.moneyDeposit = 0,
        this.budget = 0,
        this.budgetDay = 0,
        this.budgetMonth = 0,
        this.expensesMonth = 0;
}


AppData.prototype.start = function (e) {


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


};
AppData.prototype.showResult = function () {

    dayBudgetResult.value = this.budgetDay;
    monthBudgetResult.value = this.budgetMonth;
    monthExpensesResult.value = this.expensesMonth;
    addExpensesResult.value = this.addExpensesArr.join(', ');
    addIncomeResult.value = this.addIncome.join(', ');
    targetMonthResult.value = Math.ceil(this.getTargetMonth());
    incomePeriodResult.value = this.calcPeriod();
    periodSelect.addEventListener('change', this.showResult.bind(this));




};
AppData.prototype.addExpensesBlock = function () {


    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
    this.keyEvents();
    expensesItems = document.querySelectorAll('.expenses-items');


    if (expensesItems.length === 3) {

        btnPlusExpensesAdd.style.display = 'none';
    }

};
AppData.prototype.getExpenses = function () {
    let _this = this;


    expensesItems.forEach(function (item) {

        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {

            _this.expenses[itemExpenses] = cashExpenses;

        }
    });


};
AppData.prototype.addIncomeBlock = function () {
    let _this = this;

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let title = cloneIncomeItem.querySelector('.income-title').value = '';
    let amount = cloneIncomeItem.querySelector('.income-amount').value = '';


    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
    _this.keyEvents();
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {

        btnPlusIncomeAdd.style.display = 'none';
    }

};
AppData.prototype.getIncome = function () {
    let _this = this;

    incomeItems.forEach(function (item) {

        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {

            _this.income[itemIncome] = cashIncome;
        }

    });





};
AppData.prototype.getAddExpenses = function () {
    let _this = this;
    let addExpenses = addExpensesField.value.split(',');

    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpensesArr.push(item);

        }

    });
};
AppData.prototype.getAddIncome = function () {
    let _this = this;

    addIncomeField.forEach(function (item) {

        let itemValue = item.value.trim();
        if (itemValue !== '') {

            _this.addIncome.push(itemValue);
        }
    });

};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    let _this = this;

    for (let item in _this.expenses) {

        sum += parseFloat(_this.expenses[item]);
    }
    _this.expensesMonth = sum;
    return _this.expensesMonth;
};
AppData.prototype.getIncomeMonth = function () {
    let _this = this;
    for (let item in this.income) {

        this.incomeMonth += parseFloat(_this.income[item]);
    }

};

AppData.prototype.getBudget = function () {

    this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
    this.budgetDay = Math.floor(this.budgetMonth / 30);

};

AppData.prototype.getTargetMonth = function () {
    return +targetAmaunt.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
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



};
AppData.prototype.getInfoDeposit = function () {

    if (appData.deposit) {

        appData.percentDeposit = fieldsValidation(['Какой годовой процент ?', 10], 'number');

        appData.moneyDeposit = fieldsValidation(['Какая сумма заложена ', 10000], 'number');

    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;

};
AppData.prototype.changePeriod = function () {
    periodCounter.innerHTML = periodSelect.value;

};
AppData.prototype.checkString = function (e) {


    let pattern = /[А-Яа-яЁё0-9\ \, \.]/;

    let key = String.fromCharCode(e.charCode);
    if (key.search(pattern) === -1) {

        e.preventDefault();
    }
};
AppData.prototype.checkNum = function (e) {
    let pattern = /[0-9]/;

    let key = String.fromCharCode(e.charCode);
    if (key.search(pattern) === -1) {

        e.preventDefault();
    }

};
AppData.prototype.keyEvents = function () {

    let num = document.querySelectorAll('[placeholder]');
let _this = this;
    num.forEach(function (item) {

        if (item.placeholder === 'Сумма') {
            item.addEventListener('keypress', _this.checkNum);
        }
        if (item.placeholder === 'Наименование') {
            item.addEventListener('keypress', _this.checkString);
        }
    });



};
AppData.prototype.blockInput = function () {


    calculate.style.display = 'none';
    clear.style.display = 'block';

    let inputs = document.getElementsByTagName('input');//.querySelectorAll('[type=text]');

    for (let field of inputs) {

        if (field.getAttribute('type') === 'text') {

            field.setAttribute('readonly', 'readonly');

            btnPlusExpensesAdd.removeEventListener('click', this.addExpensesBlock);
            btnPlusIncomeAdd.removeEventListener('click', this.addIncomeBlock);

        }

    }
};
AppData.prototype.clearData = function () {

    let inputs = document.getElementsByTagName('input');

    for (let field of inputs) {

        if (field.getAttribute('type') === 'text') {

            field.value = '';
        }

        this.income = {},
            this.incomeMonth = 0,
            this.addIncome = [],
            this.expenses = {},
            this.addExpensesArr = [],
            this.deposit = false,
            this.percentDeposit = 0,
            this.moneyDeposit = 0,
            this.budget = 0,
            this.budgetDay = 0,
            this.budgetMonth = 0,
            this.expensesMonth = 0;
        calculate.style.display = 'block';
        clear.style.display = 'none';
        btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
        btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);
        field.removeAttribute('readonly');

        if (expensesItems.length > 1) {

            for (let i = 1; expensesItems.length > i; i++) {
                expensesItems[i].remove();
            }
            if (btnPlusExpensesAdd.style.display === 'none') {
                btnPlusExpensesAdd.style.display = 'block';
            }

        }


        if (incomeItems.length > 1) {

            for (let i = 1; incomeItems.length > i; i++) {
                incomeItems[i].remove();
            }

            if (btnPlusIncomeAdd.style.display === 'none') {
                btnPlusIncomeAdd.style.display = 'block';
            }

        }


    }


};


AppData.prototype.isNumber = function (n) {

    return !isNaN(parseFloat(n)) && isFinite(n);

}

AppData.prototype.fieldsValidation = function (question, neededType) {

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




};

AppData.prototype.eventListeners = function () {
    let start = this.start;
    let clearData = this.clearData;
    let addExpensesBlock = this.addExpensesBlock;
    let addIncomeBlock = this.addIncomeBlock;
    let changePeriod = this.changePeriod;

    this.keyEvents();

    calculate.addEventListener('click', start.bind(this));
    btnPlusExpensesAdd.addEventListener('click',addExpensesBlock.bind(this));
    btnPlusIncomeAdd.addEventListener('click',addIncomeBlock.bind(this));
    periodSelect.addEventListener('input',changePeriod.bind(this));
    clear.addEventListener('click', clearData.bind(this));


    targetAmaunt.addEventListener('keypress', this.checkNum);
    salaryAmaunt.addEventListener('keypress', this.checkNum);



};


let appData1 = new AppData();

window.onload = appData1.eventListeners();
























