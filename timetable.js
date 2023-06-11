import { COLOR } from './todo_list.js';

function init() {
    let myArray = Array.from({ length: 24 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        timetable();
    });
}

init();

export function Make_palette(input1_value) {
    const palette_container = document.getElementById('palette');
    const btn = document.createElement('button');
    btn.classList.add('palette_btn');
    btn.setAttribute('id', `${input1_value}`);

    btn.style.backgroundColor = COLOR.get(input1_value).color;
    palette_container.appendChild(btn);
}



function timetable() {
    const timetable_container = document.getElementById('timetable');
    const timetable_div = document.createElement('div');
    timetable_div.setAttribute('id', 'timetable_div');
    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        const input = document.createElement('input');
        input.type = "text";
        input.value = "";
        input.classList.add('timetable_input');
        timetable_div.appendChild(input);
    });
    timetable_container.appendChild(timetable_div);
}

