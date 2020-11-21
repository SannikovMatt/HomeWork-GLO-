

let money = 2100,
    income = 'Аренда',
    addExpenses = 'интернет, аренда, машина',
    deposit = true,
    mission = 1000000,
    period = 12;//Месяцев 12

console.log(money);
console.log(income);
console.log(deposit);

console.log(addExpenses.length);//Вывел длинну строки

console.log('Период равен: ' + period + ' месяцев');
console.log('Цель заработать: ' + mission + ' евро');



addExpenses = addExpenses.toLowerCase();

addExpensesArr = addExpenses.split(', ');

console.log(addExpensesArr);


let budgetDay = money / 30;

console.log(budgetDay);






