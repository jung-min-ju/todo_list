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
    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');

    const check_btn = document.createElement('button');
    const plus_btn = document.createElement('button');

    check_btn.setAttribute('id', `${number}`);

    input_1.type = 'text';
    tr.textContent = "";
    tr.setAttribute('id', `${number}`);

    input_2.type = 'text';
    input_2.textContent = "";
    input_2.setAttribute('id', `${number}`);

    number++;
    plus_btn.textContent = " + ";
    check_btn.textContent = "no";

    tr.appendChild(plus_btn);
    tr.appendChild(input_1);
    tr.appendChild(input_2);
    tr.appendChild(check_btn);
    tbody.appendChild(tr);

    plus_btn.addEventListener('click', push_plus); // 노션 문제점 1 참고
    check_btn.addEventListener('click', function (event) { // 노션 문제점 2 참고
        push_check(event);
    });
}

function push_check(event) {
    const check_btn = event.target;
    const check_text = check_btn.textContent;
    check_btn.textContent = check_text === "no" ? "yes" : "no";
}
