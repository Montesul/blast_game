const canvasScoreBar = document.getElementById('score_bar');
contextScoreBar = canvasScoreBar.getContext('2d');

const widthCanvasScoreBar = 500,
    heightCanvasScoreBar = 500;

canvasScoreBar.width = widthCanvasScoreBar;
canvasScoreBar.height = heightCanvasScoreBar;


const scoreField = new Image(),
    scoreMovesField = new Image(),
    scorePointField = new Image();

scoreField.src = 'assets/score_bar/score_field.png';
scoreMovesField.src = 'assets/score_bar/moves.png';
scorePointField.src = 'assets/score_bar/score_point_field.png';

let step = 15;


function StrokeText() {
    contextScoreBar.textAlign = 'center';
    contextScoreBar.fillStyle = "white";
    contextScoreBar.strokeStyle = "white";
    contextScoreBar.font = "italic 40pt Arial";
    contextScoreBar.fillText(step, 245, 215);
    contextScoreBar.font = 'bold 40px sans-serif';
    contextScoreBar.strokeText("Очков: " + point, widthCanvasScoreBar / 2, heightCanvasScoreBar - 85);
}

setInterval(() => {

    contextScoreBar.clearRect(0, 0, canvasScoreBar.width, canvasScoreBar.height);
    contextScoreBar.drawImage(scoreField, 0, 75, widthCanvasScoreBar, heightCanvasScoreBar - 75);
    contextScoreBar.drawImage(scorePointField, 20, heightCanvasScoreBar - 175, heightCanvasScoreBar - 40, 150);
    contextScoreBar.drawImage(scoreMovesField, widthCanvasScoreBar / 2 - 125, 75, 250, 250);

    StrokeText();

    if (step == 0) {
        gameOver('проиграли');
    }

}, 100);