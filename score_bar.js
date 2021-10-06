const canvasScoreBar = document.getElementById('score_bar');
contextScoreBar = canvasScoreBar.getContext('2d');

const widthCanvasScoreBar = 500,
    heightCanvasScoreBar = 700;

canvasScoreBar.width = widthCanvasScoreBar;
canvasScoreBar.height = heightCanvasScoreBar;


const scoreField = new Image(),
    scoreMovesField = new Image(),
    mixButton = new Image(),
    scoreStepField = new Image(),
    scorePointField = new Image();

scoreField.src = 'assets/score_bar/score_field.png';
scoreMovesField.src = 'assets/score_bar/moves.png';
scorePointField.src = 'assets/score_bar/score_point_field.png';
mixButton.src = 'assets/button.png';
scoreStepField.src = 'assets/score_bar/step_field.png';

function StrokeText() {
    contextScoreBar.textAlign = 'center';
    contextScoreBar.fillStyle = "white";
    contextScoreBar.strokeStyle = "white";
    contextScoreBar.font = "italic 40pt Marvin";
    contextScoreBar.fillText(step, 245, 215);
    contextScoreBar.font = 'bold 40px Marvin';
    contextScoreBar.strokeText("Ходов:", widthCanvasScoreBar / 2, 50);
    contextScoreBar.strokeText("Очки: " + point, widthCanvasScoreBar / 2, heightCanvasScoreBar - 285);
    contextScoreBar.font = 'bold 18px Marvin';
    contextScoreBar.strokeText("Перемешать поле. Осталось: " + mixCount, widthCanvasScoreBar / 2, heightCanvasScoreBar - 100);    
}

setInterval(() => {

    contextScoreBar.clearRect(0, 0, canvasScoreBar.width, canvasScoreBar.height);
    contextScoreBar.drawImage(scoreStepField, 150, 0, 200, 200);
    contextScoreBar.drawImage(scoreField, 0, 75, widthCanvasScoreBar, heightCanvasScoreBar - 275);
    contextScoreBar.drawImage(scorePointField, 20, heightCanvasScoreBar - 375, widthCanvasScoreBar - 40, 150);
    contextScoreBar.drawImage(scoreMovesField, widthCanvasScoreBar / 4, 75, 250, 250);
    contextScoreBar.drawImage(mixButton, widthCanvasScoreBar / 7, heightCanvasScoreBar - 175, 350, 150);

    StrokeText();

    if (step == 0) {
        gameOver(false);
    }

}, 200);

canvasScoreBar.onclick = (e) => {
    let x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;
    if (x > widthCanvasScoreBar / 7 && x < widthCanvasScoreBar / 7 + 350 &&
        y > heightCanvasScoreBar - 175 && y < heightCanvasScoreBar - 25) {
        if (mixCount > 0) {
            mixCount--;
            loadArrayBlocks();
        }
    }
}