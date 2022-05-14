class rect {
    constructor(x, y, width, height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color=color;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    getColor(){
        return this.color;
    }
    draw(elementID){
        let canvas = document.getElementById(elementID);
        let ctx = canvas.getContext("2d");
        ctx.fillstyle = '#fa4b2a';
        ctx.fillRect(10, 40, 140, 160);
    }
}