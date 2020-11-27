'use strict';


const weekArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];

let today = new Date().getDay() - 1;
let p = document.getElementById('output');
let text = '';

for (let day of weekArr) {

    if (weekArr[today] === day) {
        text += `<b> ${day} </b> <br/>`;

    } else if (weekArr[5] === day || weekArr[6] === day) {

        text += `<i> ${day} </i> <br/>`;

    } else {
        text += ` ${day}  <br/>`;
    }


}

p.innerHTML = text;

