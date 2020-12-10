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
    clear = document.getElementById('cancel'),
    //Deposit
    depositCheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');



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




    start(e) {


        if (salaryAmaunt.value === '') {
            e.preventDefault();
            return;
        }

        this.budget = +salaryAmaunt.value;




        this.getIncExp();
        this.getIncExpMonth();
        this.getAddIncExp();
this.getDepositInfo();

        this.getBudget();
        this.showResult();
        this.blockInput();
        this.getDepositInfo();


    }
    showResult() {

        dayBudgetResult.value = this.budgetDay;
        monthBudgetResult.value = this.budgetMonth;
        monthExpensesResult.value = this.expensesMonth;
        addExpensesResult.value = this.addExpenses.join(', ');
        addIncomeResult.value = this.addIncome.join(', ');
        targetMonthResult.value = Math.ceil(this.getTargetMonth());
        incomePeriodResult.value = this.calcPeriod();
        periodSelect.addEventListener('change', this.showResult.bind(this));




    }

    addBlock(e) {

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

    }

    getIncExp() {

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


    }
    getAddIncExp() {

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




    }

    getIncExpMonth() {
        const _this = this;
        for (let item in this.income) {

            this.incomeMonth += parseFloat(_this.income[item]);
        }


        for (let item in _this.expenses) {

            _this.expensesMonth += parseFloat(_this.expenses[item]);
        }


    }

    getBudget() {

        const monthDeposit = this.moneyDeposit * (this.percentDeposit/100);

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    }

    getTargetMonth() {
        return +targetAmaunt.value / this.budgetMonth;
    }

    getStatusIncome() {
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



    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;

    }
    changePeriod() {
        periodCounter.innerHTML = periodSelect.value;

    }
    checkString(e) {


        const pattern = /[А-Яа-яЁё0-9\ \, \.]/;

        const key = String.fromCharCode(e.charCode);
        if (key.search(pattern) === -1) {

            e.preventDefault();
        }
    }
    checkNum(e) {
        const pattern = /[0-9]/;

        const key = String.fromCharCode(e.charCode);
        if (key.search(pattern) === -1) {

            e.preventDefault();
        }

    }
    keyEvents() {

        let num = document.querySelectorAll('[placeholder]');

        const _this = this;
        num.forEach(function (item) {

            if (item.placeholder === 'Сумма') {
                item.addEventListener('keypress', _this.checkNum);
            }
            if (item.placeholder === 'Наименование' || item.placeholder === 'название') {
                item.addEventListener('keypress', _this.checkString);
            }
        });



    }
    blockInput() {


        calculate.style.display = 'none';
        clear.style.display = 'block';

        let inputs = document.getElementsByTagName('input');//.querySelectorAll('[type=text]');

        for (const field of inputs) {

            if (field.getAttribute('type') === 'text') {

                field.setAttribute('readonly', 'readonly');

                btnPlusExpensesAdd.removeEventListener('click', this.addExpensesBlock);
                btnPlusIncomeAdd.removeEventListener('click', this.addIncomeBlock);
                depositBank.disabled = true;
                

            }

        }
    }
    clearData() {

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
            this.expenses = {},
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

        depositBank.disabled = false;      
        depositCheck.checked = false;
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        depositBank.value = '';


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





    }
    isNumber(n) {

        return !isNaN(parseFloat(n)) && isFinite(n);

    }

    changePercent(){


        let valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            depositPercent.addEventListener('keypress',(e)=>{

                let pattern = /[0-9]/;

                if(pattern.test(e.key) && (depositPercent.value + e.key)<=100){

                   if(depositPercent.value > 100){
                    e.preventDefault();

                   }
                   valueSelect = depositPercent.value;

                }else{e.preventDefault();}
                

            });
    }else{
        depositPercent.style.display = 'none';
       depositPercent.value = valueSelect;
    }

}

    getDepositInfo(){

        if(this.deposit){

            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;

        }


    }
    depositHandler() {

        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);

        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }


    }

    eventListeners() {


        this.keyEvents();

        calculate.addEventListener('click', this.start.bind(this));
        btnPlusExpensesAdd.addEventListener('click', this.addBlock.bind(this));
        btnPlusIncomeAdd.addEventListener('click', this.addBlock.bind(this));
        periodSelect.addEventListener('input', this.changePeriod.bind(this));
        clear.addEventListener('click', this.clearData.bind(this));
        depositCheck.addEventListener('change', this.depositHandler.bind(this));






    }


}

const appData = new AppData();

window.onload = appData.eventListeners();








