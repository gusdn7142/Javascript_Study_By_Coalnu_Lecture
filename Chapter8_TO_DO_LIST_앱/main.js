/**
 * To Do Task Tab - Sliding Animation
 */

let taskUnderLine = document.getElementById("under-line");

function underLineIndicator(event) {
    //console.log("event : ",  event.target);  //각 태그의 id 값 조회 (all, progress, Complete)
    taskUnderLine.style.left = event.currentTarget.offsetLeft + "px";
    taskUnderLine.style.width = event.currentTarget.offsetWidth + "px";
    taskUnderLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}

document.addEventListener("DOMContentLoaded", () => {   //슬라이딩 윈도우 초기 Tab 지정
    underLineIndicator({ currentTarget: all });
});





/**
 * To Do 
 */
//1. 변수 초기화
let article = document.querySelector('article');   //article Div
let toDoInput = document.querySelector('.toDo__input');   //input Div
let toDoTaskDiv = document.querySelector('.toDo__task');   //toDo__task Div
let toDoTaskTab = document.querySelector('.toDo__task__tab');   //ALL, Progress, Complete 탭
// let underLine = document.getElementById('under-line');              //underLine
let taskInput = document.getElementById("task-input");   //입력받은 값
let addButton = document.getElementById("add-button");   //값 추가 버튼
let taskList = [];                                      //전체 task 배열
let filterList = [];                                    //진행중인 task 배열
let tabs = document.querySelectorAll(".toDo__task__tab a");   //task tab 
let tabMode = 'all';



//2. 이벤트 선언
addButton.addEventListener("click", addTask);                 //2.1 값 추가 버튼 이벤트

for(let i=0; i<tabs.length; i++){                             //2.2 task tab의 클릭 이벤트
    tabs[i].addEventListener("click", function(event){ filter(event) } )
}



//3. 데이터 추가 버튼 클릭
function addTask() {

    if(taskInput.value.length < 1){
        alert("일정 내용을 입력해 주세요.");
        return;
    } else if(taskInput.value.length > 48){
        alert("48자 이상 작성할 수 없습니다.");
        taskInput.value = "";
        return;
    }




    let completeFlag = false;
    if(tabMode == 'complete'){
        completeFlag = true;
    }

    let task = {  //task 객체
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete: completeFlag    //default : false
    }  

    taskList.push(task);
    filter();             //필터 후 UI 업데이트
    taskInput.value = ''; //입력값 초기화
}




//4. 완료/미완료 체크 버튼 클릭
function completeContent(id) {

    //1개의 id에 해당되는 task를 complete/non-complet 처리
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }

    filter();    //필터 후 UI 업데이트
}



//5. 삭제 버튼 클릭
function deleteContent(id) {

    //1개의 id에 해당되는 task를 삭제 처리
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }

    filter();    //필터 후 UI 업데이트
}







//6. 각 탭 버튼 클릭
function filter(event){
 
    if(event){
        tabMode = event.target.id;    //all, progress, Complete
        underLineIndicator(event);
    } 

    filterList = [];

    if(tabMode === "progress"){     //진행중인 아이템(isComplete=false)만 보여주기
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);          //진행중인 아이템만 모으기
            }
        }
        //console.log("진행 중 : ", filterList);
    } else if(tabMode === "complete"){         //완료된 아이템(isComplete=true)만 보여주기
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);          //완료된 아이템만 모으기
            }
        }
        //console.log("진행 중 : ", filterList);
    } else {  }                             //전체 리스트를 보여주기 (tabMode === "all")
    
    render();
    
}




//7. 화면 렌더링 (UI 업데이트)
function render(){

    //1. 내가 선택한 탭에 따라서 리스트를 달리 보여준다.
    let viewList = [];
    let bgColorClass = 'bgColor__all';

    // let bgColorFlag = 0;          //0:all,  1:progress,  2:complete

    if(tabMode === "all"){                //모두 보여주기
        viewList = taskList;  
        bgColorClass = 'bgColor__all';

        article.style.backgroundColor = 'ivory';
        article.style.borderColor = 'cornsilk';
        toDoInput.querySelector('input').style.borderColor = 'cornsilk';
        toDoInput.querySelector('button').style.backgroundColor = 'cornsilk';
        toDoInput.querySelector('button').style.borderColor = 'cornsilk';
        toDoTaskDiv.style.borderColor = 'cornsilk';
        toDoTaskTab.style.backgroundColor = 'cornsilk';
        toDoTaskTab.style.borderColor  = 'cornsilk';     
        taskUnderLine.style.backgroundColor = 'peachpuff';
    }else if(tabMode === "progress"){    //진행중인 것
        viewList = filterList;
        bgColorClass = 'bgColor__progress';

        article.style.backgroundColor = '#E0ECFF';
        article.style.borderColor = '#B3D4FF';
        toDoInput.querySelector('input').style.borderColor = '#B3D4FF';
        toDoInput.querySelector('button').style.backgroundColor = '#B3D4FF';
        toDoInput.querySelector('button').style.borderColor = '#B3D4FF';
        toDoTaskDiv.style.borderColor = '#B3D4FF';
        toDoTaskTab.style.backgroundColor = '#B3D4FF';
        toDoTaskTab.style.borderColor  = '#B3D4FF';
        taskUnderLine.style.backgroundColor = '#4B89FF';
    } else if(tabMode === "complete"){    //완료된 것만 보여주기
        viewList = filterList;
        bgColorClass = 'bgColor__complete';

        article.style.backgroundColor = '#9EDC92';
        article.style.borderColor = '#8ECF88';
        toDoInput.querySelector('input').style.borderColor = '#8ECF88';
        toDoInput.querySelector('button').style.backgroundColor = '#8ECF88';
        toDoInput.querySelector('button').style.borderColor = '#8ECF88';
        toDoTaskDiv.style.borderColor = '#8ECF88';
        toDoTaskTab.style.backgroundColor = '#8ECF88';
        toDoTaskTab.style.borderColor  = '#8ECF88';
        taskUnderLine.style.backgroundColor = '#6AA84F';
    }


    let resultHTML = '';

    for(let i=0; i< viewList.length; i++){
        if(viewList[i].isComplete == true){    //완료된 할일이면 (취소선 추가)
            resultHTML += `<div class="${bgColorClass}">   
                    <div class="task-complete toDo__task__text">${viewList[i].taskContent}</div>
                    <div class="toDo__task__btn">
                        <button onclick="completeContent('${viewList[i].id}')" class="toDo__task__In-Progress" >➜ In Progress</button>
                        <button onclick="deleteContent('${viewList[i].id}')" class="toDo__task__delete">✖ Delete</button>
                    </div>
                </div>`
        } else {                               //완료안된 할일이면
            resultHTML += `<div class="${bgColorClass}">   
                    <div class="toDo__task__text">${viewList[i].taskContent}</div>
                    <div class="toDo__task__btn">
                        <button onclick="completeContent('${viewList[i].id}')" class="toDo__task__Completed" >✔ Completed</button>
                        <button onclick="deleteContent('${viewList[i].id}')" class="toDo__task__delete">✖ Delete</button>
                    </div>
                </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}





//기타) 랜덤 ID 생성
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}




/**
 * 부가 기능
 */

//1) Enter키 이벤트
document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addTask()
    }
});

//2) input 이벤트
taskInput.addEventListener("focus", function() {
    taskInput.value = "";
});







