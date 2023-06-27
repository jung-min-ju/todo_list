import { COLOR } from './todo_list.js';

let palette_index = 0;
let EraserMouseDown = false;


export function Make_palette(input1_value) { //color_btn 있는 팔레트 판 생성
    const palette_container = document.getElementById('palette');
    const fade_input = document.createElement('input');
    const color_btn = document.createElement('button');
    const btn_count = palette_container.querySelectorAll('*').length + 1;

    if (btn_count === 1) {
        const eraser_div = document.getElementById('eraser_div');
        const eraser_btn = document.createElement('button');
        const result_btn = document.createElement('button');

        eraser_btn.setAttribute('id', 'eraser_btn');
        eraser_btn.setAttribute('data-toggle', 'tooltip');
        eraser_btn.setAttribute('title', 'ERASER');
        eraser_btn.addEventListener('click', function (event) {
            eraser_event(event, input1_value);
        });
        eraser_div.appendChild(eraser_btn);

        result_btn.addEventListener('click', function () {
            console.log(COLOR);
        });
        result_btn.setAttribute('id', 'result_btn');
        eraser_div.appendChild(result_btn);

        palette_container.appendChild(fade_input);
        fade_input.setAttribute('id', 'fade_input');
        fade_input.style.border = 'none';
    }

    if (btn_count % 8 === 0) { //color_btn 한 줄 내리기
        const palette_div = document.createElement('div');
        palette_container.appendChild(palette_div);
        palette_container.appendChild(fade_input);
        fade_input.setAttribute('id', 'fade_input');
        fade_input.style.border = 'none';
    }

    color_btn.classList.add('palette_btn');

    color_btn.style.backgroundColor = COLOR.get(input1_value).color;

    color_btn.setAttribute('id', `color_btn${palette_index}`);
    color_btn.setAttribute('data-toggle', 'tooltip');
    color_btn.setAttribute('title', `${input1_value}`);
    palette_container.appendChild(color_btn);

    add_drag_event(`color_btn${palette_index}`, input1_value);
}


function add_drag_event(btn_id, input1_value) {
    const btn = document.getElementById(btn_id);
    btn.addEventListener('click', function (event) {
        push_drag(btn_id, input1_value);
    });
    palette_index++;
}


function push_drag(btn_id, input1_value) { //타임테이블의 형관펜 함수
    const timetable = document.getElementById('timetable');

    const btn = document.getElementById(btn_id);
    const helpObj = COLOR.get(`${input1_value}`);
    const btn_color = btn.style.backgroundColor;

    function mousemove(event) {
        const target_element = event.target;

        if (target_element.tagName === 'INPUT') {
            if (target_element.classList.contains("class_time")) return;
            if (target_element.style.backgroundColor === `${btn_color}`) return;
            else {
                target_element.style.backgroundColor = `${btn_color}`;
                target_element.style.borderColor = `${btn_color}`;
                target_element.setAttribute('data-toggle', 'tooltip');
                target_element.setAttribute('title', input1_value);

                helpObj.time++;
                COLOR.set(`${input1_value}`, helpObj);
            }
        }
    }


    function mousedown(event) {
        timetable.addEventListener('mousemove', mousemove);
    }

    function mouseup(event) {
        timetable.removeEventListener('mousemove', mousemove);
    }

    timetable.addEventListener('mousedown', mousedown, { once: true });
    timetable.addEventListener('mouseup', mouseup, { once: true });
}


function eraser_event(event, input1_value) { //타임테이블의 지우개 함수
    const timetable = document.getElementById('timetable');

    function mousemove(event) {
        const target_element = event.target;
        const input1_value = target_element.getAttribute('title');
        const helpObj = COLOR.get(`${input1_value}`);

        if (EraserMouseDown) {
            if (target_element.style.backgroundColor === '') {
                return;
            }
            else {
                target_element.style.backgroundColor = '';
                target_element.style.borderColor = '';
                helpObj.time--;
                COLOR.set(`${input1_value}`, helpObj);
            }
        }
    }


    function mousedown(event) {
        timetable.addEventListener('mousemove', mousemove);
        EraserMouseDown=true;
    }

    function mouseup(event) {
        timetable.removeEventListener('mousemove', mousemove);
        EraserMouseDown=false;
    }

    timetable.addEventListener('mouseup', mouseup, { once: true });
    timetable.addEventListener('mousedown', mousedown, { once: true });

}
