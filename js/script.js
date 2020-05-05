/*
 * TODO:
 * - DarkMode
 * - Pi
 * - Square root
 * - Percentage
 * - pow
 */

let total = document.querySelector('#total');
let accumulator = document.querySelector('#accumulator');
let count = [];
let saveAction;
const MAX_LENGTH = 8;

function insertNumber(num) {
    if (total.innerHTML.length < MAX_LENGTH) {
        if (total.innerHTML == 0 && !total.innerHTML.includes(".")) {            
            total.innerHTML = num;
        } else {
            total.innerHTML += num;
        }
    }
}

function changeAcc(action) {
    count.push(Number(total.innerHTML));
    if (accumulator.innerHTML == 0) {
        accumulator.innerHTML = ` ${total.innerHTML} ${action}`;
    }
    else {
        accumulator.innerHTML += ` ${total.innerHTML} ${action}`;
    }
    total.innerHTML = 0;
    count.push(action)
}


function insertComma() {
    if (!total.innerHTML.includes(".")) {
        total.innerHTML += "."
    }
}
