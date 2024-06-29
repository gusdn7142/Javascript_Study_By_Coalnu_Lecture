


//문제1) 1부터 100까지 더하는 for문을 만들고 결과를 출력하시오.
let sum = 0;
for(let i=1; i<=100; i++){
    sum += i;
}
console.log(sum);




//문제2) 1부터 100까지 홀수만 출력하자.
for(let i=1; i<=100; i++){
    if(i % 2 != 0){
        console.log(i);
    }
}




//문제3) 1부터 50까지 369결과를 프린트하자.
for(let i=1; i<=50; i++){
    let tempStr = i + "";
    let flag = false;

    for(let j=0;j<tempStr.length;j++){
        if(tempStr[j] == "3" ||tempStr[j] == "6" ||tempStr[j] == "9" ){
            console.log("짝");
            flag = true;
        }
    }

    if(!flag){
        console.log(i);
    }
}


//문제4) 주어진 숫자가 소수이면 true 아니면 false를 출력하는 프로그램을 짜시오.
let n = 7;
let flag = true;   //소수

for(let i=2; i<=n-1; i++){
    if(n % i == 0){
        flag = false;  //소수X
        break;
    }
}

console.log(flag);









