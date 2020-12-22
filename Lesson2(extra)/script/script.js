'use strict';
/* 

1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в div с id=task1 на «<strong>функция</strong>». 

2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00.
заключить найденное время в тег <b></b>

3. Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>

4. Замените в документе домены вида http://site.ru на <a href="http://site.ru">site.ru</a>, 

5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль

6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить
на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>


Попрактикуйтесь на кроссвордах https://regexcrossword.com/
и на задачках https://habr.com/ru/post/167015/
 */


const task1 = document.getElementById('task1'),
    body = document.querySelector('body');

task1.innerHTML = task1.innerHTML.replace(/функци(я|и|)/g, (str, val1, val2) => { return str = `<strong>${str}</strong>` });
let a = [];

let pattern = /([0-9]{2}:[0-9]{2})|(http:\/\/[\-$\/\.a-zA-Z]+)|(#[0-9]{6})|(["«][а-яА-ЯёЁ0-9,.:— ]*["»])/g;
body.innerHTML = body.innerHTML.replace(pattern, (str, var1, var2, var3, var4) => {

    if (var1) {

        return `<b>${var1}</b>`;
    } else if (var2) {

        let website = var2.match(/[a-z]+\.ru/g);
        return `<a href="${var2}">${website[0]}</a>`;
    } else if (var3) {
        console.log(var3);
        return var3;
    } else if (var4) {
            var4 = var4.replace(/[0-9]{2}:[0-9]{2}/, (str)=>{ return `<b>${str}</b>`; });

        return `<mark>${var4}</mark>`;
    }

});
