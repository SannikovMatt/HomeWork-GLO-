document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const getCar = (car) => {

            return new Promise((resolve, reject) => {


                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.send();

                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) { return; }
                    if (request.status === 200) {

                        const data = JSON.parse(request.responseText);
                        let cars = [];
                        data.cars.forEach(item => item.brand === car ? cars.push(item) : '');

                        cars.length ? resolve(cars) : reject('Машин не найдено')

                        
                    } else {reject('Неполадки с сервером...');}
                });

            });
        };

        const outputCar = (cars) => {
            cars.forEach(({ brand, model, price }) => output.innerHTML = `Тачка ${brand} ${model}<br>Цена: ${price}$`);


        };

        getCar(select.value)
            .then(outputCar)
            .catch(error => output.innerHTML = error);


    });

});