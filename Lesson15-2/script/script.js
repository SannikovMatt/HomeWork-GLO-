

class First{

    hello  (){

           console.log('Я метод родителя');
    }
}
class Second extends First{

    hello(){

        First.prototype.hello();
        console.log('А я наследуемый метод');
    }   

}

let sec = new Second();
sec.hello();
