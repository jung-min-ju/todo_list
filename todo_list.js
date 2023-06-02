let number=1;

function init() {
    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    myArray.forEach(function (item) {
       push_plus();
    });
}

window.addEventListener('load',init());
//무조건 이 함수 먼저 실행되게 해주는 것 -> 제일 최상위객체 window

function push_plus() {
    let number=0;
    const table = document.getElementById('table');
    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const span = document.createElement('span');

    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');

    const check_btn = document.createElement('button');
    const plus_btn = document.createElement('button');

    input_1.type = 'text';
    td.textContent = "";
    td.setAttribute('id', `${number}`);

    input_2.type = 'text';
    input_2.textContent = "";
    input_2.setAttribute('id', `${number}`);

    console.log(number);
    number++;

    plus_btn.textContent = " + ";
    span.appendChild(plus_btn);

    td.appendChild(span);
    td.appendChild(input_1);
    td.appendChild(input_2);

    tr.appendChild(td);
    tbody.appendChild(tr);

    check_btn.textContent = "check";
    tr.appendChild(check_btn);

    
    plus_btn.addEventListener('click', () => { push_plus()}); 
    //여기서 화살표 함수를 쓰지 않고 밑과 같은 방식으로 호출하게 되면 무한재귀호출에 걸리게 됨.
    check_btn.addEventListener('click', push_check);
    
}

function push_check() {
    console.log('push check');
}

const plus = document.getElementById('plus_btn');
console.log(plus);
plus.addEventListener('click', push_plus());

