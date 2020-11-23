'use strict';


let lang,

    temp = confirm('Если нажмете "да" то продолжим на русском ,если "нет" то на английском'),

    daysRu = 'Понедельник,вторник,среда,четвер,пятница,суббота,воскресение'.toUpperCase(),

    daysEn = 'Monday,Tuesday,Wednesday,thursday,friday,saturday,sunday'.toUpperCase();

let ru = [daysRu],
    en = [daysEn],

    arr = [en, ru];




//В зависимости от действий пользователя выбираем язык
if (temp) {
    lang = 'ru';
} else {
    lang = 'en';
}

if (lang === 'en') {

    console.log(daysEn);

} else {

    console.log(daysRu);
}



switch (lang) {

    case 'en':
        console.log(daysEn);
        break;

    case 'ru':
        console.log(daysRu);
        break;

}


///через многомерный массив без ифов и switch.
console.log(arr[+temp][0]);


///__________________________________________2

let namePerson;

namePerson === 'Артем' ? console.log('Директор') : 
namePerson === 'Максим' ? console.log("преподователь") : console.log("Студент");

