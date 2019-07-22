var Circle = (function () {
    function Circle(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.opacity = 0;
        this.velocity = {
            x: dx,
            y: dy
        };
    }
    Circle.prototype.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    };
    Circle.prototype.check = function (circle) {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
            this.velocity.x *= -1;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
            this.velocity.y *= -1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        for (var i = 0; i < circle.length; i++) {
            if (this === circle[i])
                continue;
            if (Utils.getDist(this.x, this.y, circle[i].x, circle[i].y) - this.radius * 2 < 0) {
                Utils.resolveCollision(this, circle[i]);
            }
        }
        if (Utils.getDist(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.6) {
            this.opacity += 0.02;
        }
        else if (this.opacity > 0) {
            this.opacity -= 0.01;
            this.opacity = Math.max(0, this.opacity);
        }
        this.draw();
    };
    return Circle;
}());
var Animate = (function () {
    function Animate() {
    }
    Animate.prototype.display = function () {
        var _this = this;
        c.clearRect(0, 0, innerWidth, innerHeight);
        for (var _i = 0, circle_1 = circle; _i < circle_1.length; _i++) {
            var draw = circle_1[_i];
            draw.check(circle);
        }
        requestAnimationFrame(function () { return _this.display(); });
    };
    return Animate;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.randomColor = function (col) {
        return col[Math.floor(Math.random() * colors.length)];
    };
    Utils.getDist = function (x1, y1, x2, y2) {
        var xDistance = x1 - x2;
        var yDistance = y1 - y2;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    };
    Utils.rotate = function (velocity, angle) {
        var rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
        return rotatedVelocities;
    };
    Utils.resolveCollision = function (particle, otherParticle) {
        var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
        var xDist = otherParticle.x - particle.x;
        var yDist = otherParticle.y - particle.y;
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
            var m1 = particle.mass;
            var m2 = otherParticle.mass;
            var u1 = Utils.rotate(particle.velocity, angle);
            var u2 = Utils.rotate(otherParticle.velocity, angle);
            var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
            var vFinal1 = Utils.rotate(v1, -angle);
            var vFinal2 = Utils.rotate(v2, -angle);
            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;
            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;
        }
    };
    return Utils;
}());
//# sourceMappingURL=utils.js.map