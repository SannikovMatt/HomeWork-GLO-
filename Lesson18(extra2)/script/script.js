'use strict';

window.onload = function () {

    const start = document.getElementById('start'),
        pause = document.getElementById('pause'),
        stop = document.getElementById('stop'),
        ball = document.createElement('div');

    let x = 200,
        y = 200,
        stopAnimation,
        started = false;


    ball.style.cssText = `  width: 50px; 
                            height:  50px ; 
                            background-color: red;
                            border-radius: 50%;
                            position:absolute;
                            display:none;  `;

    document.body.append(ball);

    function animate() {

        if (x === 200 && y !== 100) {
            y--;
        } else if (y === 100 && x !== 100) {

            x--;
        } else if (x === 100 && y !== 200) {

            y++;
        } else if (y === 200 && x !== 200) {

            x++;
        }

        ball.style.left = x + 'px';
        ball.style.top = y + 'px';

        stopAnimation = requestAnimationFrame(animate);
    };
    

    start.addEventListener('click', () => {
        if (!started) {
            ball.style.display = 'block';
            animate();
            started = true;

            pause.addEventListener('click', () => {
                cancelAnimationFrame(stopAnimation);
                started = false;

            });

            stop.addEventListener('click', () => {

                ball.style.display = 'none';
                cancelAnimationFrame(stopAnimation);
                started = false;
                x = 200;
                y = 200;

            })

        }
    });




};









