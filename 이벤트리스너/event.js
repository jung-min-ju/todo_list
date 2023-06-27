let index = 0;

const color = new Map();

function make_palette() {
    const palette_container = document.getElementById('palette');
    const button = document.createElement('button');

    button.setAttribute('id', `button_${index}`);
    button.classList.add('palette_btn');

    let value_object = { index: `${index}`, time: 0 };
    color.set(`button_${index}`, value_object);
    palette_container.appendChild(button); // 버튼을 팔레트 컨테이너에 추가
    add_event();
}

function add_event() {
    const btn = document.getElementById(`button_${index}`);
    const helpObj = color.get(`button_${index}`);
    btn.addEventListener('click', function (event) {
        helpObj.time++;
        color.set(`button_${index}`, helpObj);
    });
    index++;
}