'use strict';

const output1 = document.querySelector('.output1');
const output2 = document.querySelector('.output2');


output1.innerHTML = '';
output2.innerHTML = '';


function getDate() {

    let today = new Date();
    let date = {

        day: today.getDay(),
        date: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        hour: today.getHours(),
        min: today.getMinutes(),
        sec: today.getSeconds()
    };
    return date;

}

function firstType() {
    const weekArr = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'];
    const monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    
    let dateO = getDate();


    let today = 'Сегодня ' + weekArr[dateO.day - 1] + ' ,';
    let date = dateO.date;
    let month = ' ' + monthArr[dateO.month] + ',';
    let year = dateO.year + " года";
    let hour = " ";
    let min = " ";
    let sec = " ";


    if ([1, 21].includes(dateO.hour)) {

        hour += dateO.hour + ' час';
    } else if ([2, 3, 4, 22, 23].includes(dateO.hour)) {
        hour += dateO.hour + ' часа';

    } else {
        hour += dateO.hour + ' часов';

    }


    if ([1, 21, 41, 51, 31].includes(dateO.min)) {

        min += dateO.min + ' минута';
    } else if ([2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54].includes(dateO.min)) {
        min += dateO.min + ' минуты';

    } else {
        min += dateO.min + ' минут';

    }

    if ([1, 21, 41, 51, 31].includes(dateO.sec)) {

        sec += dateO.sec + 'секунда';
    } else if ([2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54].includes(dateO.sec)) {
        sec += dateO.sec + ' секунды';

    } else {
        sec += dateO.sec + ' секунд';

    }


    output1.innerHTML = today + date + month + year + hour + min + sec;






}

function secondType(){
    let dateO = getDate();

    
    let date = dateO.date ;
    let month =dateO.month + 1;
    let year = dateO.year;
    let hour = dateO.hour;
    let min = dateO.min;
    let sec = dateO.sec;


    if(date >= 0 && date < 9){
        date  = '0' + date;
    }
    if(month >= 0 && month < 9){
        month  = '0' + month;
    }
    if(hour >= 0 && hour < 9){
        hour  = '0' + hour;
    }
    if(min >= 0 && min < 9){
        min  = '0' + min;
    }
    if(sec >= 0 && sec < 9){
        sec  = '0' + sec;
    }

    output2.innerHTML = date + '.' + month + '.' + year + '-'+  hour + ':' + min + ':' + sec ;

}

setInterval(firstType, 1);
setInterval(secondType,1);

