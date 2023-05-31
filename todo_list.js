
function init() {
    let myArray = Array.from({ length: 7 }, (_, index) => index + 1);
    let number = 1;

    myArray.forEach(function (item) {
        number = push_plus(number);
    });
}

function push_plus(number) {
    const table = document.getElementById('table');
    const tbody = document.getElementById('tbody');

    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const span = document.createElement(`span`);

    const input_1 = document.createElement('input');
    const input_2 = document.createElement('input');

    const check_btn = document.createElement('button');
    const plus_btn = document.createElement('button');

    input_1.type = 'text';
    td.textContent = "";
    td.setAttribute('id', `${number}`);
    console.log(number);
    input_2.type = 'text';
    input_2.textContent = "";
    input_2.setAttribute('id', `${number}`);
    number++;

    if (number<=8) {
        plus_btn.textContent = " + ";
        span.appendChild(plus_btn);
    }
    else if(number>8){
         plus_btn.remove();
         plus_btn.textContent = " + ";
         span.appendChild(plus_btn);
    }

    td.appendChild(span);
    td.appendChild(input_1);
    td.appendChild(input_2);

    tr.appendChild(td);
    tbody.appendChild(tr);

    check_btn.textContent = "check";
    tr.appendChild(check_btn);

    plus_btn.addEventListener('click', function(event) {
        push_plus(number); 
    });
    check_btn.addEventListener('click', push_check);
    return number;
    

}

function push_check() {
    
}

init();

