const $pong = $('#pong');
const $playerPlat = $('#playerPlat');
const $aiPlat = $('#aiPlat');


const aiPlat = {
    direction: 1,
    speed: 5,
    top: 0
}

console.log($pong);

$pong.mousemove(function(ev){
    const top = Math.min($pong.height() - $playerPlat.height(),
        ev.pageY - $pong.offset().top);
    $playerPlat.css({
        top: `${top}px`
    });
});

function update() {
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