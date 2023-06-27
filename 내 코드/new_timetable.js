import { COLOR } from './todo_list.js';

let palette_index = 0;

function init() {
    const result_btn = document.createElement('button');
    const palette_container = document.getElementById('palette');

    result_btn.innerHTML = "result";
    result_btn.addEventListener('click', function (event) {
        console.log(COLOR);
    });
    palette_container.appendChild(result_btn);
}

export function Make_palette(input1_value) { //color_btn 있는 팔레트 판 생성
    init();
    const palette_container = document.getElementById('palette');
    const color_btn = document.createElement('button');
    color_btn.classList.add('palette_btn');
    color_btn.style.backgroundColor = COLOR.get(input1_value).color;

    function attach_id() {
        color_btn.setAttribute('id', `color_btn${palette_index}`);
        color_btn.setAttribute('data-toggle', 'tooltip');
        color_btn.setAttribute('title', `${input1_value}`);
    }
    attach_id();
    palette_container.appendChild(color_btn);

    add_event(`color_btn${palette_index}`, input1_value);
    palette_index++;
}

function add_event(btnId, input1_value) {
    const btn = document.getElementById(btnId);
    console.log(input1_value);
    const value_map = COLOR.get(`${input1_value}`);
    btn.addEventListener('click', function (event) {
        value_map.time++;
        COLOR.set(`${input1_value}`, value_map);
    });
}

