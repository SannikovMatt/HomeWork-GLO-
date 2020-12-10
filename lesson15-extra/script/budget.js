'use strict';


const calculate = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    checkBoxDepositCheck = document.querySelector('#deposit-check'),
    addIncomeField = document.querySelectorAll('.additional_income-item'),
    //РЕЗУЛЬТАТЫ Правая сторона
    monthBudgetResult = document.getElementsByClassName('result-total budget_month-value')[0],
    dayBudgetResult = document.getElementsByClassName('result-total budget_day-value')[0],
    monthExpensesResult = document.getElementsByClassName('result-total expenses_month-value')[0],
    addIncomeResult = document.getElementsByClassName('result-total additional_income-value')[0],
    addExpensesResult = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodResult = document.getElementsByClassName('result-total income_period-value')[0],
    targetMonthResult = document.getElementsByClassName('result-total target_month-value')[0],
    ////////Поля ввода левой стороны
    //Зарплата
    salaryAmaunt = document.querySelector('.salary-amount'),
    //Дополнительный доход
    incomeName = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    //Обязательные расходы
    expensesName = document.querySelector('.expenses-title'),
    //Возможные расходы
    addExpensesFields = document.querySelectorAll('.additional_expenses'),
    //Возможные доходы
    addIncomeFields = document.querySelectorAll('.additional_income'),
    //Цель
    targetAmaunt = document.querySelector('.target-amount'),
    //Период расчета
    periodSelect = document.querySelector('.period-select'),
    //Period Conunter
    periodCounter = document.querySelector('.period-amount'),
    clear = document.getElementById('cancel');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');




class AppData {

    constructor() {
        this.income = {},
            this.incomeMonth = 0,
            this.addIncome = [],
            this.expenses = {},
            this.addExpenses = [],
            this.deposit = false,
            this.percentDeposit = 0,
            this.moneyDeposit = 0,
            this.budget = 0,
            this.budgetDay = 0,
            this.budgetMonth = 0,
            this.expensesMonth = 0;
    }
}

AppData.prototype.start = function (e) {


    if (salaryAmaunt.value === '') {
        e.preventDefault();
        return;
    }

    this.budget = +salaryAmaunt.value;




    this.getIncExp();
    this.getIncExpMonth();
    this.getAddIncExp();
    this.getBudget();
    this.showResult();
    this.blockInput();


};
AppData.prototype.showResult = function () {

    dayBudgetResult.value = this.budgetDay;
    monthBudgetResult.value = this.budgetMonth;
    monthExpensesResult.value = this.expensesMonth;
    addExpensesResult.value = this.addExpenses.join(', ');
    addIncomeResult.value = this.addIncome.join(', ');
    targetMonthResult.value = Math.ceil(this.getTargetMonth());
    incomePeriodResult.value = this.calcPeriod();
    periodSelect.addEventListener('change', this.showResult.bind(this));




};

AppData.prototype.addBlock = function (e) {

    const clickBtn = e.target;
    const itemType = clickBtn.parentNode.className;

    let item = clickBtn.parentNode.querySelectorAll(`.${itemType}-items`);


    let clone = item[0].cloneNode(true);
    clone.querySelector(`.${itemType}-title`).value = '';
    clone.querySelector(`.${itemType}-amount`).value = '';
    clickBtn.insertAdjacentElement('beforebegin', clone);
    item = clickBtn.parentNode.querySelectorAll(`.${itemType}-items`);
    if (item.length === 3) {

        clickBtn.style.display = 'none';
    }

};

AppData.prototype.getIncExp = function () {

    let _this = this;

    const count = item => {

        let str = item.className.split('-')[0];

        const title = item.querySelector(`.${str}-title`).value;
        const amount = item.querySelector(`.${str}-amount`).value;

        if (title !== '' && amount !== '') {

            _this[str][title] = amount;
        }

    };

    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    incomeItems.forEach(count);
    expensesItems.forEach(count);


};
AppData.prototype.getAddIncExp = function () {

    const _this = this;
    let count = item => {


        let str = item.className.split('_')[1];

        item.querySelectorAll('input').forEach((input) => {

            let temp = input.value.trim();
            if (temp !== '') {
                let upCase = 'add' + str.substring(0, 1).toUpperCase() + str.substring(1);

                _this[upCase].push(temp);

            }
        });
    };

    addExpensesFields.forEach(count);
    addIncomeFields.forEach(count);




};

AppData.prototype.getIncExpMonth = function () {
    const _this = this;
    for (let item in this.income) {

        this.incomeMonth += parseFloat(_this.income[item]);
    }


    for (let item in _this.expenses) {

        _this.expensesMonth += parseFloat(_this.expenses[item]);
    }


};

AppData.prototype.getBudget = function () {

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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

    if (this.deposit) {

        this.percentDeposit = this(['Какой годовой процент ?', 10], 'number');

        this.moneyDeposit = this.fieldsValidation(['Какая сумма заложена ', 10000], 'number');

    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;

};
AppData.prototype.changePeriod = function () {
    periodCounter.innerHTML = periodSelect.value;

};
AppData.prototype.checkString = function (e) {


    const pattern = /[А-Яа-яЁё0-9\ \, \.]/;

    const key = String.fromCharCode(e.charCode);
    if (key.search(pattern) === -1) {

        e.preventDefault();
    }
};
AppData.prototype.checkNum = function (e) {
    const pattern = /[0-9]/;

    const key = String.fromCharCode(e.charCode);
    if (key.search(pattern) === -1) {

        e.preventDefault();
    }

};
AppData.prototype.keyEvents = function () {

    let num = document.querySelectorAll('[placeholder]');
    const _this = this;
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

    for (const field of inputs) {

        if (field.getAttribute('type') === 'text') {

            field.setAttribute('readonly', 'readonly');

            btnPlusExpensesAdd.removeEventListener('click', this.addExpensesBlock);
            btnPlusIncomeAdd.removeEventListener('click', this.addIncomeBlock);

        }

    }
};
AppData.prototype.clearData = function () {

    let inputs = document.getElementsByTagName('input');

    for (const field of inputs) {

        if (field.getAttribute('type') === 'text') {

            field.value = '';
            field.removeAttribute('readonly');
        }
    }
    this.income = {
    },
        this.incomeMonth = 0,
        this.addIncome = [],
        this.expenses = {
        },
        this.addExpenses = [],
        this.deposit = false,
        this.percentDeposit = 0,
        this.moneyDeposit = 0,
        this.budget = 0,
        this.budgetDay = 0,
        this.budgetMonth = 0,
        this.expensesMonth = 0;
    calculate.style.display = 'block';
    clear.style.display = 'none';



    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 1) {

        for (let i = 1; expensesItems.length > i; i++) {

            expensesItems[i].remove();

        }

        expensesItems = document.querySelectorAll('.expenses-items');


        if (btnPlusExpensesAdd.style.display === 'none') {
            btnPlusExpensesAdd.style.display = 'block';
        }

    }

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 1) {


        for (let i = 1; incomeItems.length > i; i++) {

            incomeItems[i].remove();



        }

        if (btnPlusIncomeAdd.style.display === 'none') {
            btnPlusIncomeAdd.style.display = 'block';
        }




        this.keyEvents();

    }





};
AppData.prototype.isNumber = function (n) {

    return !isNaN(parseFloat(n)) && isFinite(n);

};

AppData.prototype.fieldsValidation = function (question, neededType) {

    let itemToValid;

    if (neededType === 'number') {

        do {
            itemToValid = prompt(question[0], question[1]);
            if (itemToValid === null) {
                return;
            }
        }
        while (!this.isNumber(itemToValid));
        return itemToValid;
    }

    if (neededType === 'string') {

        do {
            itemToValid = prompt(question[0], question[1]);
            if (itemToValid === null) {
                return;
            }
        }
        while (typeof itemToValid !== typeof ("string") || !isNaN(itemToValid));

        return itemToValid;
    }




};

AppData.prototype.eventListeners = function () {
    const start = this.start;
    const clearData = this.clearData;
    const changePeriod = this.changePeriod;
    const addBlock = this.addBlock;

    this.keyEvents();

    calculate.addEventListener('click', start.bind(this));
    btnPlusExpensesAdd.addEventListener('click', addBlock.bind(this));
    btnPlusIncomeAdd.addEventListener('click', addBlock.bind(this));
    periodSelect.addEventListener('input', changePeriod.bind(this));
    clear.addEventListener('click', clearData.bind(this));


    targetAmaunt.addEventListener('keypress', this.checkNum);
    salaryAmaunt.addEventListener('keypress', this.checkNum);



};


const appData = new AppData();

window.onload = appData.eventListeners();








