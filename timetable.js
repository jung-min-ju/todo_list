import { COLOR } from './todo_list.js';

let IsMouseDown = false;
let EraserMouseDown = false;

function init() {
    let myArray = Array.from({ length: 24 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        timetable(item);
    });
}

init();

export function Make_palette(input1_value) {
    const palette_container = document.getElementById('palette');
    const color_btn = document.createElement('button');
    const eraser = document.createElement('button');

    color_btn.classList.add('palette_btn');
    color_btn.setAttribute('id', `${input1_value}`);

    color_btn.style.backgroundColor = COLOR.get(input1_value).color;
    color_btn.setAttribute('data-toggle', 'tooltip');
    color_btn.setAttribute('title', `${input1_value}`);

    color_btn.addEventListener('click', function (event) {
        push_drag(event, input1_value);
    });

    return_map(`${input1_value}`);

    palette_container.appendChild(color_btn);
}

function timetable(item) {
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

    if (item === 1) {
        const eraser_btn = document.createElement('button');
        eraser_btn.setAttribute('id', 'eraser_btn');
        eraser_btn.addEventListener('click', function (event) {
            delete_drag(event);
        });
        eraser_btn.setAttribute('data-toggle', 'tooltip');
        eraser_btn.setAttribute('title', 'ERASER');
        timetable_div.appendChild(eraser_btn);
    }

    timetable_container.appendChild(timetable_div);
}

function push_drag(event, input1_value) {
    const btn = event.target;
    const btn_color = window.getComputedStyle(btn).backgroundColor;
    const timetable = document.getElementById('timetable');

    timetable.addEventListener('mousedown', (event) => {
        const target_element = event.target;
        if (target_element.tagName === 'INPUT') {
            IsMouseDown = true;
        }
    })

    timetable.addEventListener('mousemove', (event) => {
        const target_element = event.target;

        if (IsMouseDown && target_element.tagName === 'INPUT') {
            if (target_element.style.backgroundColor === `${btn_color}`) {
                return;
            }
            else {
                target_element.style.backgroundColor = `${btn_color}`;
                target_element.style.borderColor = `${btn_color}`;
                COLOR.get(input1_value).time++;
            }
        }
    })

    timetable.addEventListener('mouseup', (event) => {
        IsMouseDown = false;
    })
}

function return_map(input1_value){
    return `${input1_value}`;
}

function delete_drag(event) {
    const eraser = event.target;
    const input1_value=return_map();

    eraser.addEventListener('mousedown', (event) => {
        EraserMouseDown = true;
    })

    eraser.addEventListener('mousemove', (event) => {
        const target_element = event.target;

        if (EraserMouseDown) {
            if (target_element.style.backgroundColor === '') {
                return;
            }
            else {
               // console.log('지우기');
                target_element.style.backgroundColor = '';
                target_element.style.borderColor = '';
                COLOR.get(input1_value).time--;
            }
        }
    })

    eraser.addEventListener('mouseup', (event) => {
        EraserMouseDown = false;
    })
}

