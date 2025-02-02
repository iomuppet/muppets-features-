const turnon = document.getElementById ('turnon');
const turnoff = document.getElementById ('turnoff');
const lamp = document.getElementById ('lamp');

function lampisbroken () {
    return lamp.src.indexOf ('lampadaquebrada') > -1
}

function lampon () {
    if (!lampisbroken ()){
        lamp.src = './src/images/lampadaon.png'
    }
}

function lampoff () {
    if (!lampisbroken ()){
    lamp.src = './src/images/lampadaoff.png'
    }
}

function lampbroken () {
    if (!lampisbroken ()){
    lamp.src = './src/images/lampadaquebrada.png'
    }
}

turnon.addEventListener ('click', lampon);
turnoff.addEventListener ('click', lampoff);
lamp.addEventListener ('mouseover', lampon);
lamp.addEventListener ('mouseleave', lampoff);
lamp.addEventListener ('dblclick', lampbroken);