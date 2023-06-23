import { palette_render } from './timetable.js';

let NUMBER = 18; //투두 리스트 입력칸 몇개 표시할 지
export const todo = new Map();

const COLOR_ARRAY =
    ["#55efc4", "#74b9ff", "#a29bfe", "#ffeaa7",
        "#fab1a0", "#81ecec", "#dfe6e9", "#00b894",
        "#0984e3", "#6c5ce7", "#ff7675", "#b2bec3",
        "#fdcb6e", "#e17055", "#00cec9", "#fd79a8",
        "#636e72", "#B33771", "#BDC581", "#58B19F",
        "#e67e22", "#f1c40f", "#cf6a87"];


export function init() {
    document.getElementById('delete_btn').addEventListener('click', function(){plus_line(false);});
    document.getElementById('plus_btn').addEventListener('click', plus_line);
    todo_render("init");
}

function todo_render(num=0) { //SUBJECT TODO 텍스트 입력칸 랜더링
    if(num != "init"){
        remove_event();
        NUMBER += num;
    }
    const tbody = document.getElementById('tbody');
    while(tbody.firstChild){ //tbody 요소 지우기
        tbody.firstChild.remove();
    }
    let myArray = Array.from({ length: NUMBER }, (_, index) => index);
    myArray.forEach(function (_,index) {
        let todo_ = "";
        let subject = "";
        let color = "#dddddd";
        let fontColor = "black";
        let fontWeight = "inherit";
        let checkbox_color = "";
        let checked = false;
        if(todo.has(`subject_${index}`)){
            todo_ = todo.get(`subject_${index}`).todo;
            subject = todo.get(`subject_${index}`).subject;
            color = todo.get(`subject_${index}`).color;
            fontColor = color;
            fontWeight = "bold";
            checkbox_color = color;
            checked = todo.get(`subject_${index}`).check;
        }
        const tr = document.createElement('tr');
        const td_subject = document.createElement('td');
        const td_todo = document.createElement('td');
        const td_checkbox = document.createElement('td');
    
        const input_subject = document.createElement('input');
        const input_todo = document.createElement('input');
        const checkbox = document.createElement('input');

        tr.setAttribute('id', index);
        input_subject.setAttribute('type', `text`);
        input_subject.setAttribute('id', `subject_${index}`);
        input_subject.setAttribute('class', `subject`);
        input_subject.value = subject;
        input_subject.style.borderColor = color;
        input_subject.style.fontWeight = fontWeight;
        input_subject.style.color=fontColor;
        
        input_todo.setAttribute('type', `text`);
        input_todo.setAttribute('id', `todo_${index}`);
        input_todo.setAttribute('class', `todo`);
        input_todo.value = todo_;
        
        checkbox.setAttribute('type', `checkbox`);
        checkbox.setAttribute('id', `checkbox_${index}`);
        checkbox.style.accentColor=checkbox_color;
        checkbox.checked=checked;

        td_subject.appendChild(input_subject);
        td_todo.appendChild(input_todo);
        td_checkbox.appendChild(checkbox);
        tr.appendChild(td_subject);
        tr.appendChild(td_todo);
        tr.appendChild(td_checkbox);
        tbody.appendChild(tr);
    });
    set_event();
}


function blur(event) { 
    const input = event.target;
    const input1_value = input.value;
    const COLOR_dex = Number(input.id.substring(8));
    const checked = document.getElementById(`checkbox_${COLOR_dex}`).checked;
    const todo_ = document.getElementById(`todo_${COLOR_dex}`).value;
    if (!todo.has(input.id) && input1_value.length > 1) {
        let ma = Array.from(todo.values(), (v) => v.subject);
        if (ma.indexOf(input1_value)){
            todo.set(input.id, { subject:input1_value ,todo: todo_,  color: COLOR_ARRAY[COLOR_dex], time: 0, check:checked});
            palette_render();
        }
    }
    todo_render();
}

function plus_line(p = true) { // 입력칸 추가 및 제거 -> 뭐야 이게 개쩐당
    if(p){
        if (NUMBER >= 23){
            alert('23칸 이상을 만드는 것은 불가능합니다.')
            return;
        }
        todo_render(1);
    }else{
        if(NUMBER == 1){
            alert('최소 1칸은 필요합니다.');
            return;
        }
        if(todo.has(`subject_${NUMBER-1}`)){
            let v = confirm('해당칸을 지우면 내용이 사라집니다.');
            if(!v){
                return;
            }
            todo.delete(`subject_${NUMBER-1}`);
        }
        todo_render(-1);
    }
    palette_render();
}

function remove_event(){ //이벤트 제거
    let myArray = Array.from({ length: NUMBER }, (_, index) => index);
    myArray.forEach(function (value) {
        const input = document.getElementById(`subject_${value}`);
        input.removeEventListener('blur',function (event) {
            blur(event);
        });
        const checkbox = document.getElementById(`checkbox_${value}`);
        checkbox.addEventListener('change',function (event) {
            check_change(event);
        });
    });
}
function set_event(){ //이벤트 추가
    let myArray = Array.from({ length: NUMBER }, (_, index) => index);
    myArray.forEach(function (value) {
        const input = document.getElementById(`subject_${value}`);
        input.addEventListener('blur',function (event) {
            blur(event);
        });
        const checkbox = document.getElementById(`checkbox_${value}`);
        checkbox.addEventListener('change',function (event) {
            check_change(event);
        });
    });
}

function check_change(event){ 
    const checkbox = event.target;
    const COLOR_dex = Number(checkbox.id.substring(9));

    if(todo.has(`subject_${COLOR_dex}`)){
        todo.get(`subject_${COLOR_dex}`).check = checkbox.checked;
    }else{
        checkbox.checked = !checkbox.checked ;
    }
}

init();