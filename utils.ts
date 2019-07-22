
class Circle {
    public  velocity: { x: number; y: number; };
    public  mass    : number;
    private opacity : number

    constructor(public x: number, public y: number, public radius: number, public dx: number, public dy: number, private color: string) {
        this.x        = x;
        this.y        = y;
        this.radius   = radius;
        this.color    = color;
        this.mass     = 1;
        this.opacity  = 0
        this.velocity = {
            x: dx,
            y: dy
        }
    }


    private draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle   = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    public check(circle: Array<Circle>) {
        if (this.x + this.radius > canvas.width  || this.x - this.radius < 0) this.velocity.x *= -1;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.velocity.y *= -1;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        for (let i = 0; i < circle.length; i++) {
            if (this === circle[i]) continue;
            
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
    }
}

class Animate {
    display() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        for (const draw of circle) {
            draw.check(circle);
        }
        
        requestAnimationFrame(() => this.display());
    }
}

class Utils {
    static randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomColor(col: string[]) {
        return col[Math.floor(Math.random() * colors.length)]
    }

    static getDist(x1: number, y1: number, x2: number, y2: number) {
        let xDistance = x1 - x2;
        let yDistance = y1 - y2;

        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    static rotate(velocity: { x: number; y: number; }, angle: number) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;
    }

    static resolveCollision(particle: any, otherParticle: any) {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            const u1 = Utils.rotate(particle.velocity, angle);
            const u2 = Utils.rotate(otherParticle.velocity, angle);

            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            const vFinal1 = Utils.rotate(v1, -angle);
            const vFinal2 = Utils.rotate(v2, -angle);

            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;
        }
    }
}
