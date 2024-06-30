
/**
 * 변수 선언 및 초기화
 */
let ballBoxText1 = document.getElementById("ball-box1");
let ballBoxText2 = document.getElementById("ball-box2");
let ballBoxText3 = document.getElementById("ball-box3");
let ballBoxText4 = document.getElementById("ball-box4");
let ballBoxText5 = document.getElementById("ball-box5");

let ballBoxList = [ballBoxText1, ballBoxText2, ballBoxText3, ballBoxText4, ballBoxText5];
let ballBoxTextList = [ballBoxText1.querySelector('div'), ballBoxText2.querySelector('div'), ballBoxText3.querySelector('div'), ballBoxText4.querySelector('div'), ballBoxText5.querySelector('div')];

let predictBox1 = document.getElementById("predict-box1");
let predictBox2 = document.getElementById("predict-box2");
let predictBox3 = document.getElementById("predict-box3");
let predictBox4 = document.getElementById("predict-box4");
let predictBox5 = document.getElementById("predict-box5");

let predictBoxList = [predictBox1, predictBox2, predictBox3, predictBox4, predictBox5];


let upDownBox1 = document.getElementById("upDown-box1");
let upDownBox2 = document.getElementById("upDown-box2");
let upDownBox3 = document.getElementById("upDown-box3");
let upDownBox4 = document.getElementById("upDown-box4");
let upDownBox5 = document.getElementById("upDown-box5");

let upDownBoxList = [upDownBox1, upDownBox2, upDownBox3, upDownBox4, upDownBox5];



let countBox = document.getElementById("count-box");          //count 텍스트 박스
let validBox = document.getElementById("valid-box");          //예외처리 텍스트 박스


let userInput = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
playButton.addEventListener("click", play);                 //play 버튼 클릭시 게임 시작

let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset);                 //reset 버튼 클릭시 게임 시작



let randomNum = generateRandomNum();   //랜덤 숫자 반환 (브라우저 렌더링시 초기 1회 생성됨)
let count = 0;                         //게임이 종료되는 숫자 (5)
let inputHistoryArr = [];              //유저가 입력한 값을 목록으로 저장




/**
 * 메서드 선언 및 구현
 */


//1) 랜덤번호 지정
function generateRandomNum(){
    return Math.floor(Math.random() * 100)+1;  //1~100까지의 랜덤 숫자 반화
}


//2) 게임 시작 후 랜덤번호 맞추기  (go 버튼 클릭)
function play(){

    //console.log("play 메서드 호출");

    if(validBox.style.display == "block"){   //이전 예외메시지 텍스트 none 처리
        validBox.style.display = "none";
    }

    // //유효성 검사1) 5번보다 빨리 맞추었다면 더 이상 게임진행 X
    // if(gameEndFlag == true) {
    //     validBox.textContent = "정답을 맞추어 더 이상 게임을 진행할 수 없습니다.   ";
    //     validBox.style.display = "block";      
    //     return;
    // }


    //let checkNum;                   //"up", "down", "same"
    let inputValue = userInput.value;      //사용자 입력값 반환
    

    //유효성 검사2) 1~100 범위 밖이면 예외처리(count처리X)
    if(inputValue < 1 || 100 < inputValue){
        validBox.textContent = "1부터 100사이의 숫자가 아닙니다.";
        validBox.style.display = "block";
        return;
    }

    //유효성 검사3) 이미 입력한 숫자이면 예외처리 (count처리X)
    if(inputHistoryArr.includes(inputValue)){
        validBox.textContent = "이미 입력한 숫자입니다.";
        validBox.style.display = "block";        
        return;       
    }
    inputHistoryArr.push(inputValue);                //유저가 입력한 값 기록



    //숫자 맞추기 로직
    ballBoxTextList[count].textContent = inputValue;
    ballBoxList[count].style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
    ballBoxList[count].style.transform = 'translateX(0%)';

    if(inputValue < randomNum) {          //입력값이 작을때
        //resultBoxList[count].textContent = "UP";
        upDownBoxList[count].querySelector('#up-image').style.display = "block";
        upDownBoxList[count].querySelector('div').textContent = "UP";
        upDownBoxList[count].querySelector('div').style.color = "green";
        upDownBoxList[count].style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        upDownBoxList[count].style.transform = 'translateY(0%)';

        count++;
        countBox.textContent = `남은 횟수 : ${5-count}번`;        

    } else if(inputValue > randomNum) {   //입력값이 클때
        // resultBoxList[count].textContent = "DOWN";
        upDownBoxList[count].querySelector('#down-image').style.display = "block";  
        upDownBoxList[count].querySelector('div').textContent = "DOWN";
        upDownBoxList[count].querySelector('div').style.color = "red";
        upDownBoxList[count].style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        upDownBoxList[count].style.transform = 'translateY(0%)';
        count++;
        countBox.textContent = `남은 횟수 : ${5-count}번`;   

    } else {                              //입력값이 같을떄
        upDownBoxList[count].querySelector('#right-image').style.display = "block";  
        upDownBoxList[count].style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        upDownBoxList[count].style.transform = 'translateY(0%)';
        predictBoxList[count].style.borderColor = 'rgb(97, 175, 0)';

        count++;         
        validBox.textContent = "Lotto 당첨~~";
        validBox.style.display = "block";      

        playButton.style.display = "none";
        resetButton.style.display = "block";
        return;
    }




    //5번의 게임 기회부여
    if(count > 4){
        validBox.textContent = "Game Over";
        validBox.style.display = "block";

        playButton.style.display = "none";
        resetButton.style.display = "block";
        //ballBoxTextList[count-1].innerHTML += "<br> Game Over";
        //return;
    }

    console.log("randomNum : ", randomNum);
    // console.log("inputValue : ", inputValue);   
    // console.log("count : ", count);   
    // console.log("inputHistoryArr : " + inputHistoryArr);
    // console.log("");
}




//3) 게임 리셋
function reset() {

    //console.log("reset 메서드 호출");

    validBox.textContent = "Game Restart";
    randomNum = generateRandomNum();
    //countBox.textContent = ``;   

    userInput.value = "";          //유저 입력값 초기화
    count = 0;                     //게임 기회 초기화
    inputHistoryArr = [];          //유저 입력 히스토리 기록 배열 초기화

    countBox.textContent = `남은 횟수 : 5번`;   

    ballBoxList.forEach(ballBox => {
        // predictBox.style.opacity = "0.94";
        // predictBox.style.transform = 'translateX(-1000%)';     
        ballBox.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        ballBox.style.transform = 'translateX(-100%)';
    });
    
    ballBoxTextList.forEach(ballBoxText => {
        ballBoxText.textContent = "";
    });

    upDownBoxList.forEach(upDownBox => {
        upDownBox.querySelector('#up-image').style.display = "";
        upDownBox.querySelector('#down-image').style.display = "";  
        upDownBox.querySelector('#right-image').style.display = "";  
        upDownBox.querySelector('div').textContent = "";

        upDownBox.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
        upDownBox.style.transform = 'translateY(100%)';
    });


    resetButton.style.display = "none";
    playButton.style.display = "block";
}





/**
 * 부가 기능
 */

//1) Enter키 이벤트
document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (window.getComputedStyle(playButton).display === "block") {
            play();
        } else{
            reset();
        }
    }

});


