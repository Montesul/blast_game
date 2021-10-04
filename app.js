const cvs = document.getElementById('playing_field');
ctx = cvs.getContext('2d');

let sizeFiledWidth = 8,
    sizeFiledHeight = 8;

const block = {
    width: 50,
    height: 50 * 1.1,
    head: 50 * 0.1
}

const margin = 15

let width, height;

function loadCVS() {
    width = sizeFiledWidth * block.width + margin * 2,
        height = sizeFiledHeight * (block.height - block.head) + block.head + margin * 2;

    cvs.width = width,
        cvs.height = height;
}

loadCVS();

const field = new Image(),
    blockRed = new Image(),
    blockBlue = new Image(),
    blockGreen = new Image(),
    blockPurple = new Image(),
    blockYellow = new Image();

field.src = 'assets/field.png';
blockRed.src = 'assets/blocks/red.png';
blockBlue.src = 'assets/blocks/blue.png';
blockGreen.src = 'assets/blocks/green.png';
blockPurple.src = 'assets/blocks/purple.png';
blockYellow.src = 'assets/blocks/yellow.png';



let arr = [];

let xPos = margin,
    yPos = margin;


const Rect = function (el, x, y, flag, posY) {
    this.el = el;
    this.x = x;
    this.y = y;
    this.posY = posY;
    this.flag = flag;
    this.w = block.width;
    this.h = block.height;
    this.selected = false;
}

let list4deletBlocks = [];

let countPoint = 0;

Rect.prototype = {
    select: function () {
        this.selected = !this.selected;
    },
    drawRect: function () {
        ctx.drawImage(this.el, this.x, this.posY, this.w, this.h);
    },
    moveToPosition: function () {
        if (this.posY != this.y && this.posY + 8 < this.y) {
            this.posY += 10;
        } else if (this.posY != this.y && this.posY + 2 < this.y) {
            this.posY += 2;
        } else {
            this.posY++;
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 25 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = color;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.5) {
            this.size -= 0.5;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particlesArray = [];

function handleParticle() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.5) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function loadArrayBlocks() {

    arr = [];

    for (let row = 0; row < sizeFiledHeight; row++) {
        arr.push([]);
        for (let col = 0; col < sizeFiledWidth; col++) {
            let obj = creatBlock(Math.floor(Math.random() * 10)),
                y = height - row * (block.height - block.head) - margin - block.height,
                x = col * block.width + margin;
            arr[row].push(new Rect(obj.el, x, y, obj.flag, y - 400));
        }
    }
}

loadArrayBlocks();

function generationBlock() {
    let obj = creatBlock(Math.floor(Math.random() * 10));
    obj.posY = -50 * count;
    return obj;
}
let count = 0;

function ifCursorInRect(x, y, rect) {
    return x > (rect.x + block.head) && x < rect.x + rect.w &&
        y > (rect.y + block.head * 3) && y < rect.y + rect.h;
}

function searchEl(x, y) {
    for (row of arr) {
        for (col of row) {
            if (ifCursorInRect(x, y, col)) {
                return col;
            }
        }
    }
    return false;
}


cvs.onclick = (e) => {
    let targetElement = searchEl(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);

    list4deletBlocks = [];

    if (targetElement && !targetElement.selected) {
        targetElement.select();
        let count = 1 + targetMove({ x: targetElement.x + block.width / 2, y: targetElement.y + block.height / 2, flag: targetElement.flag });
        if (count == 1) {
            targetElement.select();
        } else {
            step--;
            countPoint = Math.pow(2, count);
            createParticle();
            sortBlocks();
        }
    }
}

function createParticle() {
    for (el of list4deletBlocks) {
        for (let _ = 0; _ < 15; _++) {
            particlesArray.push(new Particle(el.x, el.y, el.flag));
        }
    }
}

function newBlock(col, rowl) {
    for (let row = rowl + 1; row < arr.length; row++) {
        if (!arr[row][col].selected) {
            arr[row][col].select();
            return arr[row][col];
        }
    }
    count++;
    return generationBlock();
}

function sortBlocks() {
    for (let col = 0; col < arr[0].length; col++) {
        for (let row = 0; row < arr.length; row++) {
            if (arr[row][col].selected) {
                let target = arr[row][col],
                    rectT = newBlock(col, row, count);
                target.el = rectT.el;
                target.flag = rectT.flag;
                target.select();
                target.posY = rectT.posY;
            }
        }
        count = 0;
    }
}

function targetMove(targetPos) {

    list4deletBlocks.push(targetPos);

    function stepToRight() {
        let rightStep = searchEl(targetPos.x + block.width, targetPos.y);
        if (rightStep && rightStep.flag == targetPos.flag && !rightStep.selected) {
            let obj = { x: rightStep.x + block.width / 2, y: rightStep.y + block.height / 2, flag: rightStep.flag };
            rightStep.select();
            list4deletBlocks.push(obj);
            return 1 + targetMove(obj);
        } else {
            return 0;
        }
    }

    function stepToLeft() {
        let leftStep = searchEl(targetPos.x - block.width, targetPos.y);
        if (leftStep && leftStep.flag == targetPos.flag && !leftStep.selected) {
            let obj = { x: leftStep.x + block.width / 2, y: leftStep.y + block.height / 2, flag: leftStep.flag };
            leftStep.select();
            list4deletBlocks.push(obj);
            return 1 + targetMove(obj);
        } else {
            return 0;
        }
    }

    function stepToUp() {
        let upStep = searchEl(targetPos.x, targetPos.y - block.height);
        if (upStep && upStep.flag == targetPos.flag && !upStep.selected) {
            let obj = { x: upStep.x + block.width / 2, y: upStep.y + block.height / 2, flag: upStep.flag };
            upStep.select();
            list4deletBlocks.push(obj);
            return 1 + targetMove(obj);
        } else {
            return 0;
        }
    }

    function stepToDown() {
        let downStep = searchEl(targetPos.x, targetPos.y + block.height);
        if (downStep && downStep.flag == targetPos.flag && !downStep.selected) {
            let obj = { x: downStep.x + block.width / 2, y: downStep.y + block.height / 2, flag: downStep.flag };
            downStep.select();
            list4deletBlocks.push(obj);
            return 1 + targetMove(obj);
        } else {
            return 0;
        }
    }

    return stepToRight() + stepToLeft() + stepToUp() + stepToDown();
}

function start() {
    for (row of arr) {
        for (col of row) {
            if (!col.selected) {
                if (col.y >= col.posY) {
                    col.moveToPosition();
                }
                col.drawRect();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    ctx.drawImage(field, 0, 0, width, height);

    start();
    handleParticle();


    requestAnimationFrame(draw);
}

blockYellow.onload = draw;


function creatBlock(num) {
    switch (num) {
        case 0:
        case 5: return { el: blockRed, flag: 'red' };
        case 1:
        case 6: return { el: blockBlue, flag: 'blue' };
        case 2:
        case 7: return { el: blockGreen, flag: 'green' };
        case 3:
        case 8: return { el: blockPurple, flag: 'purple' };
        case 4:
        case 9: return { el: blockYellow, flag: 'yellow' };
    }
}

const buttonMix = document.getElementById('button_mix');

buttonMix.onclick = loadArrayBlocks;