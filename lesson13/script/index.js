'use strict';


const calculate = document.getElementById('start');

const btnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const btnPlusExpensesAdd = document.getElementsByTagName('button')[1];

const checkBoxDepositCheck = document.querySelector('#deposit-check');


const fieldAddIncomeFirst = document.querySelectorAll('.additional_income-item')[0];
const fieldAddIncomeAmount = document.querySelectorAll('.additional_income-item')[1];

//РЕЗУЛЬТАТЫ Правая сторона
const monthBudgetResult = document.getElementsByClassName('result-total budget_day-value')[0];
const dayBudgetResult = document.getElementsByClassName('result-total budget_day-value')[0];
const monthExpensesTotal = document.getElementsByClassName('result-total expenses_month-value')[0];
const addIncomeResult = document.getElementsByClassName('result-total additional_income-value')[0];
const addExpensesResult = document.getElementsByClassName('result-total additional_expenses-value')[0];
const incomePeriodResult = document.getElementsByClassName('result-total income_period-value')[0];
const targetMonthResult = document.getElementsByClassName('result-total target_month-value')[0];


////////Поля ввода левой стороны
//Зарплата
const salaryAmaunt = document.querySelector('.salary-amount');

//Дополнительный доход
const incomeName = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');

//Обязательные расходы
const expensesName = document.querySelector('.expenses-title');
const expensesAmaunt = document.querySelector('.expenses-amount');


//Возможные расходы
const addExpensesField = document.querySelector('.additional_expenses-item');

//Цель
const targetAmaunt = document.querySelectorAll('.target-amount');


//Период расчета
const periodSelect = document.querySelector('.period-select');




console.log(btnPlusExpensesAdd);