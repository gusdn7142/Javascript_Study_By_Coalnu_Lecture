

//문제1) 유저가 입력하는 숫자가 0인지 음수인지 양수인지 판단하는 프로그램을 만드시오
let num = -1;

if(num > 0){
    console.log("양수입니다.");
} else if(num < 0){
    console.log("음수입니다.");
} else {
    console.log("0입니다.");
}




//문제2) 나는 대학교 교수다. 레포트 점수에 따라 등급을 매기는 프로그램을 만드시오
let score = 88;

if(90 <= score && score <= 100){
    console.log("A");
} else if(80 <= score && score <= 89){
    console.log("B");
} else if(70 <= score && score <= 79){
    console.log("C");
} else if(60 <= score && score <= 69){
    console.log("D");
}else if(0<=score && score<=59){
    console.log("F");
}else {
    console.log("잘못된 범위의 점수입니다")
}




//문제3) 한 지원자가 우리 회사에 지원을 했다. 지원자가 사용 가능한 스킬은 배열에 제공이 된다.
//          let skills = ["HTML","CSS","Javascript","React"];
//           Javascript와 React 둘 다 할 줄 안다면 “합격!” 
//           Javascript와 React 둘 중 하나만 할 줄 안다면 “예비”, 
//           두 스킬이 없다면 “탈락” 을 보여주는 프로그램을 짜시오

let skills = ["HTML","CSS","Javascript","React"]

if(skills.includes("Javascript") && skills.includes("React")){
    console.log("합격");
} else if(skills.includes("Javascript") || skills.includes("React")){
    console.log("예비");
} else{
    console.log("탈락");
}
