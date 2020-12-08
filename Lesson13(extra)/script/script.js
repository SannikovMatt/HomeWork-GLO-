'use strict';



let body = document.querySelector('body');
let button = document.getElementById('change');
let title = document.getElementById('color');

function changeBG(){
    let random =Math.ceil((Math.floor(Math.random()*10000000) + 1)%255);
    let random1 =Math.ceil((Math.floor(Math.random()*10000) + 1)%255);
    let random2 =Math.floor(Math.random()*255) + 1;

    random  = random.toString(16);
    random1  = random1.toString(16);
    random2  = random2.toString(16);

    body.style.background = '#' + random + random1 + random2;
    button.style.color='#' + random + random1 + random2;
    title.innerHTML = '#' + random + random1 + random2;


}

button.addEventListener('click', changeBG);



