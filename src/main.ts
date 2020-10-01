import {fibonacci} from "./test";

const canvas = document.createElement('canvas');
const c      = canvas.getContext('2d');

canvas.height         = window.innerHeight;
canvas.width          = window.innerWidth;
canvas.style.position = 'fixed';
canvas.style.top      = '0';
canvas.style.left     = '0';

const body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);
const colors = ['#2185C5', '#7ECEFD', '#FF7F66', '#6C3483', '#D35400', '#FA8072'];
let   mouse  = { x: 0, y: 0 };

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    fibonacci(1000);
});

addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    fibonacci(1000);
    init();
})

let circle: Array<Circle> = [];

function init() {
    fibonacci(1000);
    circle = [];
    for (let i = 0; i < 200; i++) {
        let radius: number = Utils.randomIntFromRange(15, 25);
        let x     : number = Utils.randomIntFromRange(radius, canvas.width  - radius);
        let y     : number = Utils.randomIntFromRange(radius, canvas.height - radius);
        let dx    : number = Utils.randomIntFromRange(-4, 4);
        let dy    : number = Utils.randomIntFromRange(-4, 4);
        let color : string = Utils.randomColor(colors);

        if (i !== 0) {
            for (let j = 0; j < circle.length; j++) {
                if (Utils.getDist(x, y, circle[j].x, circle[j].y) - radius * 2 < 0) {
                    x = Utils.randomIntFromRange(radius, canvas.width  - radius);
                    y = Utils.randomIntFromRange(radius, canvas.height - radius);  
                    
                    j = -1;
                }
            }
        }

        circle.push(new Circle(x, y, radius, dx, dy, color));
    }
}

const animate = new Animate();

init();
animate.display();
