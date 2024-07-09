

/*
 * 1. 변수 초기화  
 */
//const API_KEY = '~~~';   //변경 필요.
let newsList = [];
let url = new URL(`https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr`);   //API URL Default 값 설정
const menus = document.querySelectorAll('.menus a');     //Menu의 버튼 요소들
// console.log("menus : ", menus);
let searchInput = document.getElementById("search-input");   //입력받은 값


let totalResults = 0;   //데이터 조회 결과
let page = 1;           //페이지 번호
const pageSize = 5;    //페이지 크기
const groupSize = 5;    //보여지는 블럭 수



/*
 * 2. 이벤트 선언
 */

//2-1) 각 Menu 버튼 클릭 이벤트
menus.forEach(menu => menu.addEventListener('click', (event)=>getNewsByCategory(event))); 

// for (let i = 0; i < menus.length; i++) {
//     menus[i].addEventListener('click', function(event) {
//         getNewsByCategory(event);
//     });
// }




/*
 * 3. News API - getNews() 호출
 */

// 3-1) 페이지 첫 화면 조회[top-headlines] 
const getLatestNews = async () => {
    url = new URL(`https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr`);  
    //console.log("url : ", url);

    page = 1;
    getNews();
    // console.log("articles : ", newsList);
}


// 3-2) 카테고리별 조회[top-headlines, category] 
const getNewsByCategory = async (event) => {

    const category = event.target.id;           //textContent.toLowerCase();
    //console.log("category", category);

    //3-2-1) 카테고리별 뉴스 가져오기.
    if(category === 'all') {             //category가 'all'이면
        url = new URL(`https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr`);  
    } else {                             //category가 'Business'.....'Technology'이면
        url = new URL(
            `https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr&category=${category}`
        );
    }

    //3-2-2) 해당 카테고리로 active class CSS 지정
    const menusActiveElements = document.querySelectorAll('.menus .active');   //기존 active 삭제
    menusActiveElements.forEach((element) => {
        element.classList.remove('active');
    });  
    event.target.classList.add('active');           //신규 active 지정

    page = 1;
    getNews();
}


// 3-3) 검색어로 조회[top-headlines, keyword] 
const getNewsByKeyword = async () => {

    //3-3-1) 검색어 조회
    const keyword = searchInput.value;   //document.getElementById("search-input").value;
    //console.log("keyword :" , keyword);

    if(keyword.trim() == ''){
        alert('검색어를 입력해 주세요.');
    }


    //3-3-2) (현재 활성화된) 카테고리 조회
    const category = document.querySelector('.menus a.active').id;
    //console.log("category 출력 : ", category);


    //3-2-1) 카테고리별 뉴스 검색
        if(category === 'all') {             //category가 'all'이면
            url = new URL(`https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr&q=${keyword}`);                
        } else {                             //category가 'Business'.....'Technology'이면                                
            url = new URL(`https://today-news-2024.netlify.app/chapter10_%EB%89%B4%EC%8A%A4_%ED%83%80%EC%9E%84%EC%A6%88_%EB%A7%8C%EB%93%A4%EA%B8%B0/top-headlines?country=kr&q=${keyword}&category=${category}`);          
        }


    
    //alert("url 출력 : " + url);
    //console.log("url 출력 : ", url);

    page = 1;
    getNews();
}





/*
 * 4. News API - getNews() 구현
 */

const getNews = async () => {

    try{
        //3-1-1) 페이징 셋팅
        url.searchParams.set("page", page);        
        url.searchParams.set("pageSize", pageSize);  

        //3-1-2) API 호출
        const response = await fetch(url);  
        // console.log("response : ", response);
        //alert("url 출력 : " + url);

        //3-1-3) response 값을 json 타입으로 변환
        const data = await response.json();   

        //3-1-4) 예외처리 + 
        if(response.status == 200){

            // alert("url:" + url +
            //     "\n ," + "response:" + data.articles.length
            // );

            if(data.articles.length === 0) {
                throw new Error("검색된 기사가 없습니다.");
            }

            newsList = data.articles;            //"기사" 정보만 조회
            totalResults = data.totalResults;    //"기사"의 총 개수 셋팅
            render();                            //화면 렌더링
            paginationRender();                  //페이징 부분 렌더링
        } else{
            throw new Error(data.message);
        }
        
        //console.log("data : ", data);
    } catch(error){
        //console.log("error : " ,  error.message);
        errorRender(error.message);
    }
}



/*
 * 5. News API - 화면 렌더링
 */
const render = () => {
    
    const newsHTML = newsList.map(
        (news) => {
            const publishedDate = new Date(news.publishedAt);
            const formattedDateTime = publishedDate.toLocaleString();
            
            return `<div class = "row news">  
                        <div class="col-4">
                            <img class="news-img" src="${news.urlToImage}" onerror="this.onerror=null; this.src='./image/No_Image.png';" >
                        </div>

                        <div class="col-8">
                            <h2>${news.title}</h2>
                            <p>     
                                ${news.description ? news.description : "뉴스 내용이 존재하지 않습니다." }
                            </p>
                            <div>
                                <a class="news-url" href="${news.url}">${news.source.name}</a> |  ${formattedDateTime}
                            </div>
                        </div> 
                    </div>`                 //${news.publishedAt}
    }).join('');   
    //console.log("html : " + newsHTML);

    document.getElementById("news-board").innerHTML = newsHTML;
};
    //방법1) for문
    //방법2) array 함수






/*
 * 6. News API - 페이징 부분 렌더링
 */
const paginationRender = () => {

    //전체 페이지 수
    const totalPages = Math.ceil(totalResults / pageSize) ;   

    //현재 페이지 블럭
    const pageGroup = Math.ceil(page / groupSize);   //현재 페이지 / 블럭개수(5)

    //마지막 페이지
    let lastPage = pageGroup * groupSize;           //마지막 페이지 그룹이 그룹사이즈보다 작다?   lastPage = totalpage

    //마지막이 5개로 안떨어지는 경우 마지막 페이지 숫자에 맞춰서 5개 보여주
    if(lastPage > totalPages){
        lastPage = totalPages;
    }


    //첫번쨰 페이지
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);   //10-4=6
    
    let paginationHTML = ``;
    if(page > 1){
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${1})">&lt&lt</a></li>`;
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page-1})">&lt</a></li>`;    
    }

    for(let i=firstPage; i<=lastPage; i++){
        paginationHTML += `<li class="page-item ${i===page? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    if(page < totalPages){
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${page+1})" href="#">&gt;</a></li>`;
        paginationHTML += `<li class="page-item"><a class="page-link" onclick="moveToPage(${totalPages})" href="#">&gt;&gt;</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}




/*
 * 7. getNews()에서 발생하는 예외 처리
 */

const errorRender = (errorMessage) => {      //부트스트랩에서 가져옴.    
    
    const errorHTML = `<div class="alert alert-danger" role="alert"> 
        ${errorMessage} </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
    document.querySelector(".pagination").innerHTML = `<li class="page-item"><a class="page-link">0</a></li>`;
}



/*
 * 8. 페이지 이동
 */
const moveToPage = (pageNum) => {
    //console.log("moveToPage", pageNum);
    page = pageNum;
    getNews();

}

// 


/**
 * 첫 페이지 News 조회
 */
document.getElementById("all").classList.add('active');
getLatestNews();






/**
 * 부가 기능
 */

//1) Enter키 이벤트 (자동 적용)
//document.addEventListener("keyup",  (event) => {
    //if (event.key === "Enter") {
        //getNewsByKeyword()
    //}
//});


//2) input 이벤트
searchInput.addEventListener("focus", function() {
    searchInput.value = "";
});


//3) head-line 클릭 이벤트
const headLine = document.querySelector('.head-line span'); 
headLine.addEventListener('click', function(event) {
    getLatestNews();
});



