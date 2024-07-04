



/**
 * ES6문제
 */
//문제1) 다음의 코드를 es6 문법을 이용하여 재작성 하시오

let name="noona's fruit store";
let fruits = ["banana","apple","mango"];
let address="Seoul";

let store = { name, fruits, address };
console.log(store);




//문제2) es6 문법을 이용하여 다음과 같이 출력하시오
//       (제 가게 이름은 noona's fruit store 입니다. 위치는 Seoul 에 있습니다)
console.log(`제 가게 이름은 ${store.name} 입니다. 위치는 ${store.address} 에 있습니다`)




//문제3) 다음 코드를 Destructoring을 이용하여 해결하시오
function calculate({ a, b, c }) {    // 매개변수를 Destructuring
    return a + b + c;
}
console.log(calculate({a:1, b:2, c:3})); // 6


function calculate(obj){
    let {a,b,c}=obj
    return a+b+c
}

console.log(calculate({a:1,b:2,c:3})); 




//문제4) 다음 문제에 정답이 true가 나오게 하시오
name="noona store"
fruits = ["banana","apple","mango"]

address={
    country:"Korea",
    city:"Seoul"
}

function findStore(obj){
    return name==="noona store" && address.city === "Seoul"
}
console.log(findStore({name, fruits, address}))


function findStore(obj){
    let {name, address:{city}} = obj
    return name=="noona store" && city=="Seoul"
}
console.log(findStore({name, fruits, address}))





//문제5) 다음과같이 프린트되게 코드를 바꾸시오
function getNumber(){
    let array = [1, 2, 3, 4, 5, 6];
    const [first , third, forth] = array; // 배열을 destructuring
    return { first, third, forth };        // 객체로 반환
}

console.log(getNumber()); // 결과값 { first: 1, third: 3, forth: 4 }




//문제6) 다음의 결과가 true가 되게 하시오
function getCalendar(first, ...rest) {
    return (
      first === "January" &&
      rest[0] === "Febuary" &&
      rest[1] === "March" &&
      rest[2] === undefined
    );
}


console.log(getCalendar("January", "Febuary","March")); 




//문제7) 두 어레이들중 최소값을 찾는 함수를 완성하시오
function getMinimum(){
    let a = [45,23,78]
    let b = [54,11,9]

    return Math.min(...a, ...b);     
}

console.log(getMinimum())




//문제8) 다음의 함수를 화살표 함수로 바꾸시오
function sumNumber() {
    //const sum = (a,b) => { return a+b; }
    const sum = (a, b) => a + b;
    return sum(40, 10);
}

console.log(sumNumber());




//문제9) 다음함수를 화살표 함수로 바꾸시오
function sumNumber() {
    //let addNumber = (a) => (b) =>  (c) => a + b + c;
    const addNumber = a => b => c => a + b + c;
    return addNumber(1)(2)(3);
  }

console.log(sumNumber());  










/**
 * 배열함수 문제
 */

let names = [
    "Steven Paul Jobs",
    "Bill Gates",
    "Mark Elliot Zuckerberg",
    "Elon Musk",
    "Jeff Bezos",
    "Warren Edward Buffett",
    "Larry Page",
    "Larry Ellison",
    "Tim Cook",
    "Lloyd Blankfein",
];


//문제1) map 문제
//문제1-1) 모든 이름을 대문자로 바꾸어서 출력하시오.
let data = names.map((name) => {
	return name.toUpperCase(); 
})

console.log(data); 


//문제1-2) 성을 제외한 이름만 출력하시오. (예-[“Steven”,“Bill”,“Mark”,“Elon”…])
let data2 = names.map((name) => {
	return name.split(' ')[0];
})
console.log(data2); 



//문제1-3) 이름의 이니셜만 출력하시오. (예-[“SPU”,“BG”,“MEZ”,“EM”…])
let data3 = names.map((name) => {
    return name.split(' ').map(
        word => word[0]
    ).join('');
})
console.log(data3); 



//문제2) filter 문제
//문제2-1) 이름에 a를 포함한 사람들을 출력하시오.
let data4 = names.filter( (name) => {
    return name.toLowerCase().includes('a');
});
console.log(data4); 


//문제2-2) 이름에 같은 글자가 연속해서 들어간 사람을 출력하시오. (예-tt,ff,ll 이런 글자들)
let data5 =  names.filter((item) => {
    let splitName = item.split("");
    return splitName.some((letter, index) => letter == splitName[index + 1]);
  })

console.log(data5);


//문제3) some 문제
//문제3-1) 전체 이름의 길이가 20자 이상인 사람이 있는가?
console.log(names.some((item)=>item.length>=20))


//문제3-2) 성을 제외한 이름에 p를 포함한 사람이 있는가?(대소문자 상관 no)
console.log(names.some((item)=>{
    let splitName = item.split(' ')
    splitName.pop()
    return splitName.some(eachName=>eachName.toLocaleLowerCase().includes("p"))
  }))
  


//문제4) every 문제
//문제4-1) 모두의 전체 이름의 길이가 20자 이상인가?
console.log(names.every(item=>item.length>=20))

//문제4-2) 모두의 이름에 a 가 포함되어 있는가?
console.log(names.every(item=>item.includes('a')))



//문제5) find 문제
//문제5-1) 전체 이름의 길이가 20자 이상인 사람을 찾으시오.
console.log(names.find(item=>item.length>=20))

//문제5-2) 미들네임이 포함되어있는 사람을 찾으시오.(예-Steven Paul Jobs)
console.log(names.find(item=>item.split(' ').length>=3))




//문제6) findIndex 문제
//문제6-1) 전체 이름의 길이가 20자 이상인 사람의 인덱스 번호를 찾으시오.
console.log(names.findIndex(item=>item.length>=20))

//문제6-2) 미들네임이 포함되어있는 사람의 인덱스 번호를 찾으시오.
console.log(names.findIndex(item=>item.split(' ').length>=3))




















































