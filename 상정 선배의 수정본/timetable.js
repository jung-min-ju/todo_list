import { todo } from './todo_list.js';

let todo_sub = [];

function init() {
    timetable_render();
    document.getElementById('remove_btn').addEventListener('click', function(){
        delete_drag();
        
        
    });
}

function timetable_render() { //타임테이블 랜더
    const timetable_container = document.getElementById('timetable');

    let lines = Array.from({ length: 24 }, (_, index) => (index + 5)%12+1);
    lines.forEach(function (line) {
        const timetable_div = document.createElement('div');
        const list_num = document.createElement('span');
        list_num.setAttribute('class', 'class_time');
        list_num.innerText = line;
        timetable_div.appendChild(list_num);

        let struct = Array.from({length: 6}, (_, index) => index);
        struct.forEach(function () {
            const input = document.createElement('input');
            input.type='text';
            input.setAttribute('class', 'timetable_input');
            timetable_div.appendChild(input);
        });
        timetable_container.appendChild(timetable_div);
    });
}

export function palette_render(){ //팔레트 랜더
    remove_palette_event(todo_sub);
    todo_sub = Array.from(todo, (v) => v[0]); //별로 좋지 않은 방법같음. 
    const palette_container = document.getElementById('palette');
    while(palette_container.firstChild){
        palette_container.firstChild.remove();
    }
    todo.forEach(function(value, key){
        const btn = document.createElement('button');
        btn.classList.add('palette_btn');
        btn.setAttribute('id', `p_${key}`);
        btn.style.backgroundColor = value.color;
        btn.setAttribute('data-toggle', 'tooltip');
        btn.setAttribute('title', value.subject);

        palette_container.appendChild(btn);
    })
    set_palette_event(todo_sub);
}

function set_palette_event(pTodo){ //팔래트 버튼들 이벤트 추가
    pTodo.forEach(function(value){
        document.getElementById(`p_${value}`).addEventListener('click', function (event) {
            push_drag(event, value);
        });
    })
}
function remove_palette_event(pTodo){//팔래트 버튼들 이벤트 제거
    pTodo.forEach(function(value){
        document.getElementById(`p_${value}`).removeEventListener('click', function (event) {
            push_drag(event, value);
        });
    })
}


function push_drag(event, key) {
    const btn_color = todo.get(key).color;
    const timetable = document.getElementById('timetable');

    function painting(event){
        const target_element = event.target;
        console.log(key);
 
        if (target_element.classList.contains("timetable_input")){
            target_element.style.backgroundColor = `${btn_color}`;
            target_element.style.borderColor = `${btn_color}`;
            target_element.setAttribute('data-toggle', 'tooltip');
            target_element.setAttribute('title', `${key}`);

            todo.get(key).time+=1;
        }
    }
    function mousedown(){
        timetable.addEventListener('mousemove', mousemove);
    }
    function mouseup(event){
        timetable.removeEventListener('mousemove', mousemove);
    }
    function mousemove(event){
        painting(event);
    }
    timetable.addEventListener('mousedown', mousedown,{once: true});
    timetable.addEventListener('mouseup', mouseup,{once: true});

}

function delete_drag() {
    const timetable = document.getElementById('timetable');

    function painting(event){
        console.log(todo);
        const target_element = event.target;
    
        if (target_element.classList.contains("timetable_input")) {
            let subject = target_element.title;
            if (todo.has(subject)){
                target_element.style.backgroundColor = ``;
                target_element.style.borderColor = ``;
                target_element.setAttribute('data-toggle', '');
                target_element.setAttribute('title', ``);

                todo.get(subject).time-=1;
            }

        }
    }
    function mousedown(){
        timetable.addEventListener('mousemove', mousemove);
    }
    function mouseup(event){
        timetable.removeEventListener('mousemove', mousemove);
    }
    function mousemove(event){
        painting(event);
    }
    timetable.addEventListener('mousedown', mousedown,{once: true});
    timetable.addEventListener('mouseup', mouseup,{once: true});
}


init();