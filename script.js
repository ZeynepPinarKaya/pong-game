const $pong = $('#pong');
const $playerPlat = $('#playerPlat');
const $aiPlat = $('#aiPlat');
const $ball = $('#ball');
const $restart = $('#restart');


const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = -Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

let interval = null;
let aiPlat = null;
let ball = null;

let playerScore = 0;
let compScore = 0;

let text1 = document.querySelector(".text");
text1.innerHTML = `You: ${playerScore} | ${compScore} :Comp` ;

$restart.click(function () {
    init();
})

function init() {
    aiPlat = {
        direction: 1,
        speed: 14,
        top: 0
    }

    ball = {
        top: 200,
        left: 300,
        angle: UP_LEFT,
        speed: 10 * (Math.random() + 1)
    }

    interval = setInterval(update, 20);
}


$pong.mousemove(function (ev) {
    if (!interval) {
        return;
    }

    const top = Math.min($pong.height() - $playerPlat.height(),
        ev.pageY - $pong.offset().top);

    $playerPlat.css({
        top: `${top}px`
    });
});

function update() {
    updateBall();
    updateAiPlat();
}

function updateBall() {
    ball.top += ball.speed * Math.sin(ball.angle);
    ball.left += ball.speed * Math.cos(ball.angle);


    $ball.css({
        top: `${ball.top}px`,
        left: `${ball.left}px`
    });

    if (isBallOverlappingWithPlayerPlat()) {
        if (ball.angle === UP_LEFT) {
            ball.angle = UP_RIGHT;
        }
        else {
            ball.angle = DOWN_RIGHT;
        }
    }

    if (isBallOverlappingWithAiPlat()) {
        if (ball.angle === UP_RIGHT) {
            ball.angle = UP_LEFT;
        }
        else {
            ball.angle = DOWN_LEFT;
        }
    }

    if (isBallOverlappingWithTop()) {
        if (ball.angle === UP_RIGHT) {
            ball.angle = DOWN_RIGHT;
        }
        else {
            ball.angle = DOWN_LEFT;
        }
    }

    if (isBallOverlappingWithBottom()) {
        if (ball.angle === DOWN_RIGHT) {
            ball.angle = UP_RIGHT;
        }
        else {
            ball.angle = UP_LEFT;
        }
    }

    const winner = getWinner();
    if (winner) {
        endGame(winner);
    }
}

function endGame(winner) {
    clearInterval(interval);
    interval = null;
    calculateScore();
    if(playerScore >= 5 || compScore >= 5){
        alert(`${winner} won the game`);
        playerScore = 0;
        compScore = 0;
        text1.innerHTML = `You: ${playerScore} | ${compScore} :Comp` ;
    }
}

function calculateScore() {
    if(getWinner() == "Computer"){compScore++}
    if(getWinner() == "You") {playerScore++}
    text1.innerHTML = `You: ${playerScore} | ${compScore} :Comp` ;

}

function isBallOverlappingWithPlayerPlat() {
    return $ball.overlaps('#playerPlat').length > 0;
}

function isBallOverlappingWithAiPlat() {
    return $ball.overlaps('#aiPlat').length > 0;
}

function isBallOverlappingWithTop() {
    return ball.top <= 0;
}

function isBallOverlappingWithBottom() {
    return ball.top >= $pong.height() - $ball.height();
}

function updateAiPlat() {
    if (aiPlat.top > $pong.height() - $playerPlat.height()) {
        aiPlat.direction = -1;
    };

    if (aiPlat.top < 0) {
        aiPlat.direction = 1;
    };

    aiPlat.top += aiPlat.direction * aiPlat.speed;

    $aiPlat.css({
        top: `${aiPlat.top}px`
    });
}

function getWinner() {
    if (ball.left < 0) {
        return 'Computer';
    } else if (ball.left > $pong.width()) {
        return 'You';
    }
    else {
        return false;
    }
}

init();
