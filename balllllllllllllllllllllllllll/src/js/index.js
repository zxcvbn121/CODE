//todo: creae ball and paddle separate classes 
let mCircle = {
    x: 300,
    y: 300,
    r: 20,
    cx: 0,
    cy: 0,
    vx: 2,
    vy: 10
};

let paddle = {
    x: 360,
    y: 300,
    w: 200,
    h: 20,
    leftBound: 200,
    rightBound: 1000,
    cx: 0,
    cy: 0
}

let brick = {
    x: 0,
    y: 0,
    w: 150,
    h: 40,
    isHit: false
}

let brickList = [];

const period = 2000; //in ms
let that;
class BouncingBall {
    constructor() {
        this.canvas = document.getElementById('stage');
        this.stage = this.canvas.getContext('2d');
        this.gradient = {};
        that = this;
    }

    init() {
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.continue = true;
        this.addEvent();
        this.setBackground();
        this.generateBricks(3);
        this.drawBall();
        paddle.y = this.canvas.height - paddle.h;
        paddle.rightBound = this.canvas.width - paddle.w;
        this.drawPaddle();
        this.calculateCenterPoints();
        this.amplitude = this.centerY - mCircle.r;
        setTimeout(function() {
            var startTime = (new Date()).getTime();
            that.animate(startTime);
        }, 1000);
    }

    generateBricks(n) {
        for (let i = 0; i < n; i++) {
            let posX = 0;
            let posY = i % n * (brick.h + 20);
            for (let j = 0; j < 4; j++) {
                posX = j * (brick.w + 20) + 20;
                let brickObj = Object.create(brick);
                brickObj.x = posX;
                brickObj.y = posY;
                brickList.push(brickObj);
                this.drawBrick(posX, posY);
            }
        }
    }

    updateBricks() {
        for (let i = 0; i < brickList.length; i++) {
            if (!brickList[i].isHit) {
                this.drawBrick(brickList[i].x, brickList[i].y);
            }
        }
    }

    drawBrick(x, y) {
        this.stage.beginPath();
        this.stage.fillStyle = 'blue';
        this.stage.fillRect(x, y, brick.w, brick.h);
        this.stage.closePath();
    }

    calculateCenterPoints() {
        mCircle.cx = mCircle.x + mCircle.r;
        mCircle.cy = mCircle.y + mCircle.r;
        paddle.cx = paddle.x + paddle.w / 2;
        paddle.cy = paddle.y + paddle.h / 2;
    }

    addEvent() {
        this.canvas.addEventListener('mousedown', this.onMouseDown, false);
        this.canvas.addEventListener('mousemove', this.onMouseMove, false);
    }

    onMouseDown(evt) {
        that.continue = false;
    }

    onMouseMove(evt) {
        if (evt.clientX <= paddle.rightBound) paddle.x = evt.clientX;
    }

    setBackground() {
        this.gradient = this.stage.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        this.gradient.addColorStop(0, 'white');
        this.gradient.addColorStop(0.7, 'skyblue');
        this.gradient.addColorStop(1, 'green');
        this.stage.fillStyle = this.gradient;
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.save();
    }

    drawBall() {
        this.stage.moveTo(mCircle.x, mCircle.y);
        this.stage.beginPath();
        this.stage.arc(mCircle.x, mCircle.y, mCircle.r, 0, Math.PI * 2, true);
        this.stage.closePath();
        this.stage.fillStyle = '#FA6900';
        this.stage.fill();
    }

    drawPaddle() {
        this.stage.beginPath();
        this.stage.fillStyle = 'orange';
        this.stage.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
        this.stage.closePath();
    }

    update() {
        this.stage.restore();
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stage.save();
        this.drawBall();
        this.drawPaddle();
        this.updateBricks();
    }

    endGame() {
        this.stage.restore();
        this.stage.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    hasCollision() {
        if (mCircle.x + mCircle.r > paddle.x &&
            (mCircle.x - mCircle.r < paddle.x + paddle.w) &&
            mCircle.y + mCircle.r > paddle.y) {
            mCircle.vy *= -1;
            mCircle.y += mCircle.vy;

            if (mCircle.x < paddle.x + mCircle.r || mCircle.x > paddle.x + paddle.w) {
                mCircle.vx *= -1;
                mCircle.x += mCircle.vx;
            }
        }
    }

    detectWallCollision() {
        if (mCircle.x >= mCircle.r && mCircle.x + mCircle.r < that.canvas.width) {
            mCircle.x += mCircle.vx;
        } else {
            mCircle.vx *= -1;
            mCircle.x += mCircle.vx;
        }
        if (mCircle.y >= mCircle.r && mCircle.y + mCircle.r < that.canvas.height) {
            mCircle.y += mCircle.vy;
        } else {
            mCircle.vy *= -1;
            mCircle.y += mCircle.vy;
        }
    }

    animate() {
        that.detectWallCollision();
        that.hasCollision();
        that.update();
        // request new frame
        requestAnimFrame(() => that.animate());
    }

}


window.requestAnimFrame = ((callback) => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let bouncingBall = new BouncingBall();
bouncingBall.init();