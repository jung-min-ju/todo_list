let NUMBER = 1;
let COLOR = new Map();
const COLOR_ARRAY = ["lavender","rgb(173, 216, 230)", "Mint Green", 
"Pale Pink", "Peach", "Light Yellow","Sky Blue","Pale Lilac","Light Green"];
//웹에서 지원하는 색도 있고 아닌 색도 있기 때문에 색이 안바뀜. 코드에는 문제없으니 넘어가



function init() {
    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        push_plus();
    });
}

window.addEventListener('load', init());
//무조건 이 함수 먼저 실행되게 해주는 것 -> 제일 최상위객체 window

function push_plus() {
    if (NUMBER !== 1) {
        const fade_delete = document.getElementById(`delete_btn${NUMBER  - 1}`);
        const fade_plus = document.getElementById(`plus_btn${NUMBER - 1}`);
        fade_delete.style.display = 'none';
        fade_plus.style.display = 'none';
    }

    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const btn_td = document.createElement('td');

    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');

    const check_btn = document.createElement('button');
    const plus_btn = document.createElement('button');
    const delete_btn = document.createElement('button');

    delete_btn.setAttribute('id', `delete_btn${NUMBER }`);
    plus_btn.setAttribute('id', `plus_btn${NUMBER }`);

    input_1.type = 'text';
    input_1.setAttribute('id', `${NUMBER }`);
    tr.textContent = "";
    tr.setAttribute('id', `${NUMBER }`);
    input_1.addEventListener('blur', function (event) { // 노션 문제점 2 참고
        blur(event);
    });

    input_2.type = 'text';
    input_2.textContent = "";

    NUMBER ++;
    plus_btn.textContent = " + ";
    check_btn.textContent = "no";
    delete_btn.textContent = " - ";

    btn_td.appendChild(delete_btn);
    btn_td.appendChild(plus_btn);

    tr.appendChild(btn_td);
    tr.appendChild(input_1);
    tr.appendChild(input_2);
    tr.appendChild(check_btn);

    tbody.appendChild(tr);
    // tbody.insertBefore(tr, tbody.children[number - 1]);

    plus_btn.addEventListener('click', push_plus); // 노션 문제점 1 참고
    delete_btn.addEventListener('click', delete_row);
    check_btn.addEventListener('click', function (event) { // 노션 문제점 2 참고
        push_check(event);
    });
}

function push_check(event) {
    const check_btn = event.target;
    const check_text = check_btn.textContent;
    check_btn.textContent = check_text === "no" ? "yes" : "no";
}

function delete_row() {
    const delete_target = document.getElementById(`${NUMBER  - 1}`); // tr 태그라는걸 알게 해줘야 된다.
    delete_target.remove();
    NUMBER --;

    const show_delete = document.getElementById(`delete_btn${NUMBER  - 1}`);
    const show_plus = document.getElementById(`plus_btn${NUMBER  - 1}`);
    show_delete.style.display = 'inline';
    show_plus.style.display = 'inline';
}

function blur(event) {
    const input = event.target;
    const input1_value = input.value;
    const number = input.id;

    if (input1_value.length < 1) return;
    const key = `${input1_value}`;
    if (!COLOR.has(key)) {
        COLOR.set(key,COLOR_ARRAY[number-1]);
        input.style.color=COLOR_ARRAY[number-1];
    }
}

