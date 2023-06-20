# todo_list

input 여백 관련 영상
https://www.youtube.com/watch?v=JfYhe13KrzA

<06.18 피드백>
-btn_count 한 번에 2번 카운팅 되는 오류 수정하기
  => color_btn이 한 줄 밑으로 내려갈때, div태그와 fade_input 요소가 같이 들어가서 한번에 2번 카운팅이 일어났던 것. 문제 없음
-중복된 값이 들어갔을 때 알림창으로 중복임을 알려주고, 해당 값을 input에서 자동으로 지우기
-


<06.20 피드백>
-COLOR의 객체 time이 제대로 돌아가지 않는 이유
 : 해당 color_btn 클릭시, push_drag 함수가 부여됨. 그리고 다른 color의 버튼을 눌러도 이전의 color_btn에서 부여된 push_drag 함수가 같이 실행되기 때문에 time이 다같이 올라가는 것!