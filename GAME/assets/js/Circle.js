class Circle {
    constructor(x, y, radius, color = '#000000') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distanceToX = 3;
        this.distanceToY = 3;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getRadius() {
        return this.radius;
    }
    getColor() {
        return this.color;
    }

    move() {
        this.x += this.distanceToX;
        this.y -= this.distanceToY;
    }

    reverseDistanceToX() {
        this.distanceToX = -this.distanceToX;
    }

    reverseDistanceToY() {
        this.distanceToY = -this.distanceToY;
    }
}