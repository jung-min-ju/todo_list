let number = 1;

function init() {
    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
        push_plus();
    });
}

window.addEventListener('load', init());
//무조건 이 함수 먼저 실행되게 해주는 것 -> 제일 최상위객체 window

function push_plus() {
    if (number !== 1) {
        const fade_delete = document.getElementById(`delete_btn${number - 1}`);
        const fade_plus = document.getElementById(`plus_btn${number - 1}`);
        fade_delete.style.display = 'none';
        fade_plus.style.display = 'none';
    }

    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');

    const check_btn = document.createElement('button');
    const plus_btn = document.createElement('button');
    const delete_btn = document.createElement('button');

    const btn_td = document.createElement('td'); // 새로운 td 요소 생성

    delete_btn.setAttribute('id', `delete_btn${number}`);
    plus_btn.setAttribute('id', `plus_btn${number}`);

    input_1.type = 'text';
    tr.textContent = "";
    tr.setAttribute('id', `${number}`);

    input_2.type = 'text';
    input_2.textContent = "";

    /*

    // input_1의 스타일 설정
    input_1.style.width = "25%";

    // input_2의 스타일 설정
    input_2.style.width = "75%";
    */

    number++;
    plus_btn.textContent = " + ";
    check_btn.textContent = "no";
    delete_btn.textContent = " - ";

    btn_td.appendChild(delete_btn); // 버튼을 td 요소에 추가
    btn_td.appendChild(plus_btn);

    tr.appendChild(btn_td); // td 요소를 tr 요소에 추가
    tr.appendChild(input_1);
    tr.appendChild(input_2);
    tr.appendChild(check_btn);

    // tbody의 두 번째 자식으로 새로운 행(tr) 추가
    tbody.insertBefore(tr, tbody.children[number - 1]);

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
    const delete_target = document.getElementById(`${number - 1}`);
    delete_target.remove();
    number--;

    const show_delete = document.getElementById(`delete_btn${number - 1}`);
    const show_plus = document.getElementById(`plus_btn${number - 1}`);
    show_delete.style.display = 'inline';
    show_plus.style.display = 'inline';

}
