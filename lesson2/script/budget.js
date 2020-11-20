

let money = 2100;
let income = 1000;
let addExpenses = 'интернет, аренда, машина';
let deposit = true;
let mission = 1000000;
let period = 120;

console.log(money);
console.log(income);
console.log(deposit);

console.log('Период равен: ' + period + ' месяцев');
console.log('Цель заработать: ' + mission + ' евро');



addExpenses = addExpenses.toLowerCase();

addExpensesArr = addExpenses.split(', ');

console.log(addExpensesArr);


let budgetDay = money /30;

console.log(budgetDay);




