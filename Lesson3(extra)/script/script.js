'use strict';


let lang,

    temp = prompt('Выберете на каком языке хотите : en или ru' ,'ru'),

    daysRu = 'Понедельник,вторник,среда,четвер,пятница,суббота,воскресение'.toUpperCase(),

    daysEn = 'Monday,Tuesday,Wednesday,thursday,friday,saturday,sunday'.toUpperCase();

let ru = daysRu.split(','),
    en = daysEn.split(' ,'),

    arr = [en, ru];




//В зависимости от действий пользователя выбираем язык
if (temp === "en") {
    lang = 0;
} else if(temp === 'ru') {
    lang = 1;
}

if (lang === 0) {

    console.log(daysEn);

} else if(lang === 1) {

    console.log(daysRu);
}



switch (lang) {

    case 0:
        console.log(daysEn);
        break;

    case 1:
        console.log(daysRu);
        break;

}


///через многомерный массив без ифов и switch.
console.log(arr[lang].toString());


///__________________________________________2

let namePerson=  prompt('Введите одно из имен,чтобы узнать род занятия человека: Артем ;Максим ; Вася' , 'студент' );

namePerson === 'Артем' ? console.log('Директор') : 
namePerson === 'Максим' ? console.log("преподователь") : console.log("Студент");

