



//문제1) "안녕 내 이름은 제시카야"라는 문장을 프린트하는 함수 'greet’를 만드시오
function greet(){
    console.log("안녕 내 이름은 제시카야")
}





//문제2)  이름을 매개변수로 전달받아 다양한 이름을 프린트 할 수 있게 함수를 수정하시오 예) “안녕 내 이름은 에밀리야”, “안녕 내 이름은 할리야”
function greet(name){
    console.log("안녕 내 이름은", name, "야")
}




//문제3) 매개변수로 전달받은 이름을 반환하게 함수를 수정하시오
//      이름을 매개변수로 전달받아 다양한 이름을 프린트 할 수 있게 함수를 수정하시오 
//      =>예) “안녕 내 이름은 에밀리야”, “안녕 내 이름은 할리야”
//      매개변수로 전달받은 이름을 반환하게 함수를 수정하시오
function greet(name){
    console.log("안녕 내 이름은 " + name + "야")
}

greet("나비");






// 문제4) meetAt 함수를 만들어주세요.
//        =>인자를 세개 받습니다.
let result = meetAt(2021, 2, 11);
console.log(result);

// function meetAt(year, month, day){
//     if(month === undefined && day === undefined ){
//         return year + "년";
//     } else if(month != undefined && day === undefined){
//         return year + "년 " + month + "월";
//     } else {
//         return year + "/" + month + "/" + day;
//     }
// }

function meetAt(year, month, day){
    if (day) {
        return `${year}/${month}/${day}`;
    }
    if (month) {
        return `${year}년 ${month}월`;
    }
    if (year) {
        return `${year}년`;
    }
}






// 문제5) findSmallestElement 함수를 구현해 주세요.
//        findSmallestElement 의 arr 인자는 숫자 값으로만 이루어진 배열입니다.

let arr = [100,200,3,0,2,1];
let result2 = findSmallestElement(arr);
console.log(result2);

function findSmallestElement(arr){

    let minValue = arr[0];

    for(let i=1; i<arr.length; i++){
        if(arr[i] < minValue){
            minValue = arr[i];
        }
    }

    return minValue;
}




//문제6) 돈을 매개변수로 받으면 몇개의 지폐와 동전이 필요한지 최소 개수를 계산해주는 함수를 만드시오
let moneyList = [50000,10000,5000,1000,500,100]
let money = 12300;
countMoneyCoin(money);

function countMoneyCoin(money){

    for(let i=0; i < moneyList.length; i++){
        let restMoney = Math.floor(money / moneyList[i]);
        console.log(moneyList[i] + " X " + restMoney)
        money = money - (moneyList[i] * restMoney)
    }

}













