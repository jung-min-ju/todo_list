import { sharedObject } from './todo_list.js';

let IsMouseDown = false;

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

    btn.style.backgroundColor = sharedObject.COLOR.get(input1_value).color;
    btn.setAttribute('data-toggle', 'tooltip');
    btn.setAttribute('title', `${input1_value}`);

    btn.addEventListener('click', function (event) {
        push_drag(event);
    });

    palette_container.appendChild(btn);
}

function timetable() {
    const timetable_container = document.getElementById('timetable');
    const timetable_div = document.createElement('div');

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

function push_drag(event) {
    const btn = event.target;
    const btn_color = window.getComputedStyle(btn).backgroundColor;
    const timetable = document.getElementById('timetable');
    const btn_name = btn.id;

    timetable.addEventListener('mousedown', (event) => {
        const target_element = event.target;
        if (target_element.tagName === 'INPUT') {
            IsMouseDown = true;
        }
    })

    timetable.addEventListener('mousemove', (event) => {
        const target_element = event.target;
        const target_color = window.getComputedStyle(target_element).backgroundColor;

        // if(target_color!==btn_color){
        //     COLOR.push
        // }
        if (IsMouseDown && target_element.tagName === 'INPUT') {
            target_element.style.backgroundColor = `${btn_color}`;
            target_element.style.borderColor = `${btn_color}`;
        }
    })

    timetable.addEventListener('mouseup', (event) => {
        IsMouseDown = false;
    })
}

function delete_drag() {

}