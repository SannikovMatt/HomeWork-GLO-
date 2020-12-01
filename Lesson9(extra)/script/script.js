const output1 = document.querySelector('.output1');
const output2 = document.querySelector('.output2');


let fieldA = output1.innerHTML = 'gggggg';
let fieldB = output2.innerHTML = '';

let today = new Date();

let date = {

    day: today.getDay(),
    date: today.getDate(),
    year: today.getFullYear(),
    hour: today.getHours(),
    min: today.getMinutes(),
    sec: today.getSeconds()
};


console.log(date.day + '-' + date.date + '-' + date.year + '-' + date.hour + '-' + date.min + '-' + date.sec);


function firstType(date) {




}

fieldA += date.day + date.date + date.year + date.hour + date.min + date.sec; 