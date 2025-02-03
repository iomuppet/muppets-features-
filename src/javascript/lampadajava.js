const turnon = document.getElementById('turnon');
const turnoff = document.getElementById('turnoff');
const lamp = document.getElementById('lamp');

let lampTurnedOnByButton = false;

function lampisbroken () {
    return lamp.src.indexOf('lampadaquebrada') > -1;
}

function lampon () {
    if (!lampisbroken ()) {
        lamp.src = './src/images/lampadaon.png';
    }
}

function lamponByButton () {
    if (!lampisbroken ()) {
        lamp.src = './src/images/lampadaon.png';
        lampTurnedOnByButton = true;
        lamp.removeEventListener('mouseleave', lampoff);
    }
}

function lampoff () {
    if (!lampisbroken ()) {
        lamp.src = './src/images/lampadaoff.png';
        if (lampTurnedOnByButton) {
            lamp.addEventListener('mouseleave', lampoff);
            lampTurnedOnByButton = false;
        }
    }
}

function lampbroken () {
    lamp.src = './src/images/lampadaquebrada.png';
}

turnon.addEventListener('click', lamponByButton);
turnoff.addEventListener('click', lampoff);
lamp.addEventListener('mouseover', lampon);
lamp.addEventListener('mouseleave', lampoff);
lamp.addEventListener('dblclick', lampbroken);
