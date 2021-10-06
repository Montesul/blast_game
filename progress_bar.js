const canvasProgBar = document.getElementById('progress_bar');
contextProgBar = canvasProgBar.getContext('2d');

const widthCvsBar = 600,
    heightCvsBar = 200;

canvasProgBar.width = widthCvsBar;
canvasProgBar.height = heightCvsBar;

const fieldBar = new Image(),
    progBar = new Image(),
    fieldProgBar = new Image(),
    progText = new Image();

fieldBar.src = 'assets/field_bar.png';
progBar.src = 'assets/progress_bar.png';
fieldProgBar.src = 'assets/field_progress_bar.png';
progText.src = 'assets/text.png';


const winPoint = 1000,
    progress = winPoint / 400;



function gameOver(win) {

    let text = '';

    if (win) {
        text = 'выиграли';
    } else {
        text = 'проиграли';
    }

    if (confirm(`Вы ${text}!\nПопробуете еще раз?`)) {
        restart();
    } else {
        let sizeW = Number(prompt('Укажите кол-во столбцов')),
            sizeH = Number(prompt('Укажите кол-во строк'));
        if (Number.isInteger(sizeW) && Number.isInteger(sizeH)) {
            sizeFiledHeight = sizeH;
            sizeFiledWidth = sizeW;
            loadCVS();
            restart();
        } else {
            gameOver('не правильно ввели размеры игрового поля');
        }
    }
}



setInterval(() => {
    point += countPoint;
    countPoint = 0;
    contextProgBar.clearRect(0, 0, canvasProgBar.width, canvasProgBar.height);

    if (point >= winPoint) {
        gameOver(true)
    }

    contextProgBar.drawImage(fieldBar, 0, 0, widthCvsBar, heightCvsBar);
    contextProgBar.drawImage(progText, widthCvsBar / 4, 20, 300, 50);
    contextProgBar.drawImage(fieldProgBar, 100, heightCvsBar / 2, 400, 20);
    if (point < winPoint) {
        contextProgBar.drawImage(progBar, 100, heightCvsBar / 2, point / progress, 20);
    } else {
        contextProgBar.drawImage(progBar, 100, heightCvsBar / 2, 400, 20);
    }

}, 50);
