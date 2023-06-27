import { Make_palette } from './timetable.js';

let NUMBER = 1;
export const COLOR = new Map();

const COLOR_ARRAY =
    ["#55efc4", "#74b9ff", "#a29bfe", "#ffeaa7",
        "#fab1a0", "#81ecec", "#dfe6e9", "#00b894",
        "#0984e3", "#6c5ce7", "#ff7675", "#b2bec3",
        "#fdcb6e", "#e17055", "#00cec9", "#fd79a8",
        "#636e72", "#B33771", "#BDC581", "#58B19F",
        "#e67e22", "#f1c40f", "#cf6a87"
    ];

function init() {
    let myArray = Array.from({ length: 19 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        push_plus();
    });
    init2();
}

function init2(){
    let myArray = Array.from({ length: 24 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        timetable(item);
        set_time(item);
    });
}

window.addEventListener('load', init());

function timetable(item) { //타임테이블 생성
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

function set_time(item) { //타임테이블의 시간 표시
    const timetable_time = document.getElementById(`timetable_time${item}`);

    if (item <= 7) timetable_time.value = item + 5;
    else if (item > 7 && item <= 19) timetable_time.value = item - 7;
    else timetable_time.value = item - 19;

    timetable_time.style.border = "none";
    timetable_time.style.textAlign = "center";
    timetable_time.disabled = true;
}

function push_plus() {
    if (NUMBER > 23) {
        alert('23칸 이상을 만드는 것은 불가능합니다.')
        return;
    }
    if (NUMBER !== 1) {
        const fade_delete = document.getElementById(`delete_btn${NUMBER - 1}`);
        const fade_plus = document.getElementById(`plus_btn${NUMBER - 1}`);
        fade_delete.style.display = 'none';
        fade_plus.style.display = 'none';
    }

    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const btn_td = document.createElement('td');

    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');
    const checkbox = document.createElement('input');

    const plus_btn = document.createElement('button');
    const delete_btn = document.createElement('button');

    delete_btn.setAttribute('id', `delete_btn${NUMBER}`);
    plus_btn.setAttribute('id', `plus_btn${NUMBER}`);

    input_1.type = 'text';
    input_1.setAttribute('id', `${NUMBER}`);
    input_1.style.width = '100px';

    tr.textContent = "";
    tr.setAttribute('id', `${NUMBER}`);
    input_1.addEventListener('blur', function (event) {
        blur(event);
    });

    input_2.type = 'text';
    input_2.textContent = "";
    input_2.style.width = "200px";

    plus_btn.textContent = " + ";
    delete_btn.textContent = " - ";

    checkbox.type = "checkbox";
    checkbox.setAttribute('id', `${NUMBER}`);
    checkbox.addEventListener('change', function (event) {
        check_change(event);
    });
    checkbox.style.width = "16px";
    checkbox.style.height = "16px";

    NUMBER++;

    btn_td.appendChild(delete_btn);
    btn_td.appendChild(plus_btn);

    tr.appendChild(btn_td);
    tr.appendChild(input_1);
    tr.appendChild(input_2);
    tr.appendChild(checkbox);

    tbody.appendChild(tr);

    plus_btn.addEventListener('click', push_plus);
    delete_btn.addEventListener('click', delete_row);
}

function delete_row() {
    if (NUMBER <= 2) {
        alert('최소 1칸은 필요합니다.');
        return;
    }
    const delete_target = document.getElementById(`${NUMBER - 1}`); // tr 태그라는걸 알게 해줘야 된다.
    delete_target.remove();
    NUMBER--;

    const show_delete = document.getElementById(`delete_btn${NUMBER - 1}`);
    const show_plus = document.getElementById(`plus_btn${NUMBER - 1}`);
    show_delete.style.display = 'inline';
    show_plus.style.display = 'inline';
}

function blur(event) {
    const input = event.target;
    const input1_value = input.value;
    const COLOR_dex = input.id - 1;

    const isColorExist = [...COLOR.values()].some(value => value.color === COLOR_ARRAY[COLOR_dex]);
    //상정 선배의 말대로, 이것도 복사본이 있는 배열이 항상 존재해야 하므로 딱히 좋은 방법인지는 모르겠음. 직접적으로 접근할 수 있는 방법 찾아보기

    if (input1_value.length < 1) return;
    if (!COLOR.has(input1_value) && (!isColorExist)) {
        let value_object = { color: `${COLOR_ARRAY[COLOR_dex]}`, time: 0 };
        COLOR.set(`${input1_value}`, value_object);
        input.style.borderColor = COLOR_ARRAY[COLOR_dex];
        input.style.fontWeight = 'bold';
        input.style.color = COLOR_ARRAY[COLOR_dex];
        Make_palette(`${input1_value}`);
    }
}


function check_change(event) {
    const checkbox = event.target;
    const COLOR_dex = checkbox.id - 1;

    if (checkbox.checked) {
        checkbox.style.accentColor = COLOR_ARRAY[COLOR_dex];
    }
    else {
        checkbox.style.accentColor = '';
    }
}