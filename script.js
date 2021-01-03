const $pong = $('#pong');
const $playerPlat = $('#playerPlat');
const $aiPlat = $('#aiPlat');
const $ball = $('#ball');

const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = -Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

const aiPlat = {
    direction: 1,
    speed: 5,
    top: 0
}

const ball = {
    top: 200,
    left: 200,
    angle: UP_LEFT,
    speed: 3
}

$pong.mousemove(function(ev){
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

    if(isBallOverlappingWithPlayerPlat()){
        if(ball.angle === UP_LEFT) {
            ball.angle = UP_RIGHT;
        } 
        else {
            ball.angle = DOWN_RIGHT;
        }
    }

    if(isBallOverlappingWithAiPlat()){
        if(ball.angle === UP_RIGHT) {
            ball.angle = UP_LEFT;
        } 
        else {
            ball.angle = DOWN_LEFT;
        }
    }

    if(isBallOverlappingWithTop()) {
        if(ball.angle === UP_RIGHT) {
            ball.angle = DOWN_RIGHT;
        } 
        else {
            ball.angle = DOWN_LEFT;
        }
    }

    if(isBallOverlappingWithBottom()) {
        if(ball.angle === DOWN_RIGHT) {
            ball.angle = UP_RIGHT;
        } 
        else {
            ball.angle = UP_LEFT;
        }
    }
}

function isBallOverlappingWithPlayerPlat () {
    return $ball.overlaps('#playerPlat').length >  0;
}

function isBallOverlappingWithAiPlat () {
    return $ball.overlaps('#aiPlat').length >  0;
}

function isBallOverlappingWithTop () {
    return ball.top <= 0;
}

function isBallOverlappingWithBottom () {
    return ball.top >= $pong.height() - $ball.height();
}

function updateAiPlat () {
    if(aiPlat.top > $pong.height() - $playerPlat.height()) {
        aiPlat.direction = -1;
    };

    if(aiPlat.top < 0) {
        aiPlat.direction = 1;
    };

    aiPlat.top += aiPlat.direction * aiPlat.speed;

    $aiPlat.css({
        top: `${aiPlat.top}px`
    });
}

setInterval(update, 20);