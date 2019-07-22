var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
var body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);
var colors = ['#2185C5', '#7ECEFD', '#FF7F66', '#6C3483', '#D35400', '#FA8072'];
var mouse = { x: 0, y: 0 };
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
var circle = [];
function init() {
    circle = [];
    for (var i = 0; i < 200; i++) {
        var radius = Utils.randomIntFromRange(15, 25);
        var x = Utils.randomIntFromRange(radius, canvas.width - radius);
        var y = Utils.randomIntFromRange(radius, canvas.height - radius);
        var dx = Utils.randomIntFromRange(-4, 4);
        var dy = Utils.randomIntFromRange(-4, 4);
        var color = Utils.randomColor(colors);
        if (i !== 0) {
            for (var j = 0; j < circle.length; j++) {
                if (Utils.getDist(x, y, circle[j].x, circle[j].y) - radius * 2 < 0) {
                    x = Utils.randomIntFromRange(radius, canvas.width - radius);
                    y = Utils.randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
        circle.push(new Circle(x, y, radius, dx, dy, color));
    }
}
var animate = new Animate();
init();
animate.display();
//# sourceMappingURL=main.js.map