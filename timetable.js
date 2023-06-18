import { COLOR } from './todo_list.js';

let IsMouseDown = false;
let EraserMouseDown = false;

function init() {
    let myArray = Array.from({ length: 24 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        timetable(item);
        set_time(item);
    });
}

init();

function timetable(item) {
    const timetable_container = document.getElementById('timetable');
    const timetable_div = document.createElement('div');

    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    myArray.forEach(function (inner_item) {
        const input = document.createElement('input');
        if (inner_item === 1) {
            input.setAttribute('id', `timetable_time${item}`);
            input.classList.add('class_time');
        }
        input.type = "text";
        input.value = "";
        input.classList.add('timetable_input');
        timetable_div.appendChild(input);
    });

    if (item === 1) {
        timetable_div.setAttribute('id', 'eraser_div');
    }
    timetable_container.appendChild(timetable_div);
}

function set_time(item) {
    const timetable_time = document.getElementById(`timetable_time${item}`);

    if (item <= 7) timetable_time.value = item + 5;
    else if (item > 7 && item <= 19) timetable_time.value = item - 7;
    else timetable_time.value = item - 19;

    timetable_time.style.border = "none";
    timetable_time.style.textAlign = "center";
    timetable_time.disabled = true;
}

export function Make_palette(input1_value) {
    const palette_container = document.getElementById('palette');
    const fade_input = document.createElement('input');
    const color_btn = document.createElement('button');
    const btn_count = palette_container.querySelectorAll('*').length + 1;

    if (btn_count === 1) {
        const eraser_div = document.getElementById('eraser_div');
        const eraser_btn = document.createElement('button');
        const result_btn = document.createElement('button');

        eraser_btn.setAttribute('id', 'eraser_btn');
        eraser_btn.addEventListener('click', function (event) {
            delete_drag(event, input1_value);
        });
        eraser_btn.setAttribute('data-toggle', 'tooltip');
        eraser_btn.setAttribute('title', 'ERASER');
        eraser_div.appendChild(eraser_btn);

        result_btn.addEventListener('click',function() {
            console.log(COLOR);
        });
        result_btn.setAttribute('id','result_btn');
        eraser_div.appendChild(result_btn);

        palette_container.appendChild(fade_input);
        fade_input.setAttribute('id', 'fade_input');
        fade_input.style.border = 'none';
    }

    if (btn_count % 8 === 0) {
        const palette_div = document.createElement('div');
        palette_container.appendChild(palette_div);
        palette_container.appendChild(fade_input);
        fade_input.setAttribute('id', 'fade_input');
        fade_input.style.border = 'none';
    }

    color_btn.classList.add('palette_btn');
    color_btn.setAttribute('id', `${input1_value}`);

    color_btn.style.backgroundColor = COLOR.get(input1_value).color;

    color_btn.setAttribute('data-toggle', 'tooltip');
    color_btn.setAttribute('title', `${input1_value}`);

    color_btn.addEventListener('click', function (event) {
        push_drag(event, input1_value);
    });
    console.log(btn_count);

    palette_container.appendChild(color_btn);
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
            if (target_element.classList.contains("class_time")) return;
            if (target_element.style.backgroundColor === `${btn_color}`) return;
            else {
                target_element.style.backgroundColor = `${btn_color}`;
                target_element.style.borderColor = `${btn_color}`;
                target_element.setAttribute('data-toggle', 'tooltip');
                target_element.setAttribute('title', `${input1_value}`);

                COLOR.get(input1_value).time+=1;
            }
        }
    })

    timetable.addEventListener('mouseup', () => {
        IsMouseDown = false;
    })
}

function delete_drag(event, input1_value) {
    const eraser = event.target;
    const timetable = document.getElementById('timetable');

    timetable.addEventListener('mousedown', () => {
        EraserMouseDown = true;
    })

    timetable.addEventListener('mousemove', (event) => {
        const target_element = event.target;

        if (EraserMouseDown) {
            if (target_element.style.backgroundColor === '') {
                return;
            }
            else {
                target_element.style.backgroundColor = '';
                target_element.style.borderColor = '';
                COLOR.get(input1_value).time-=1;
            }
        }
    })

    timetable.addEventListener('mouseup', () => {
        EraserMouseDown = false;
    })
}

