let newsList = []
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => 
    menu.addEventListener("click", (event)=>getNewsByCategory(event)));
const mySidenav = document.querySelectorAll(".mySidenav button");
mySidenav.forEach(menu => 
    menu.addEventListener("click", (event)=>getNewsByCategory(event)));
let url= new URL(`https://luxury-bienenstitch-33fe19.netlify.app/top-headlines`);
let totalResults = 0  
let page = 1
const pageSize = 10     //바뀌지 않는 값 고정
let groupSize = 5

let prevButton = document.querySelector("#prev");
let nextButton = document.querySelector("#next");
let lastButton = document.querySelector("#last");
let firstbutton = document.querySelector("#first");




function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}
function closeNav() {
document.getElementById("mySidenav").style.display = "none";
}
    
const getNews = async (url) => {
    try{
    url.searchParams.set("page", page)
    url.searchParams.set("pageSize", pageSize)
    const response = await fetch(url);
    const data = await response.json();
    
    if(response.status === 200) {
        if(data.articles.length === 0) {
            throw new Error("뉴스가 없습니다.")

        }
        newsList = data.articles;
        totalResults = data.totalResults
        render();
        paginationRender();
        console.log(url.searchParams,totalResults);

    }else {
        throw new Error(data.message)
    }
    }catch (error) {
        errorRender(error.message);
    }
};  //카테고리와 검색에서는 오류발생함

const getLatesNews = async ()=>{
    page = 1;
    const url = new URL (
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines`
        // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    );
    getNews(url);

}

const getNewsByCategory = async (event) => {
    page = 1;
    const category = event.target.textContent.toLowerCase();
    const sidecategory = event.target.textContent.toLowerCase();
    console.log("카테고리")
    const url = new URL(
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines?category=${category||sidecategory}`);
        getNews(url);
 
}

const getnewsKeyword = async () => {
    page = 1;
    const keyword = document.getElementById("searchInput").value;
    console.log("keyword", keyword)

    const url = new URL(
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines?q=${keyword}`);
        getNews(url);

    }

const render = () => {
    const newsHTML = newsList.map(news=>`<section id="news-board">
    <div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src=${news.urlToImage} />
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name} * ${news.publishedAt}</div>
        </div>
    </div>
</section>
`).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
}
const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}</div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender =()=> {
    const totalPages = Math.ceil(totalResults /pageSize);
    const pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    if(lastPage >totalPages){
        lastPage = totalPages;
    }
    let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;
    let paginationHTML =``
    if (firstPage >= 6) {
        paginationHTML = `<li class="page-item" id="first" onclick="moveToPage(1)">
                            <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                          </li>
                          <li class="page-item" id="prev" onclick="moveToPage(${page - 1})">
                            <a class="page-link" href='#js-bottom'>&lt;</a>
                          </li>`;
      }
    for(let i= firstPage; i<=lastPage;i++) {
        paginationHTML += `<li class="page-item ${i === page ? "active" : ''}" 
        onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
    }
    if (lastPage < totalPages) {
        paginationHTML += `<li class="page-item" id="next" onclick="moveToPage(${page + 1})">
                            <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                           </li>
                           <li class="page-item" id="last" onclick="moveToPage(${totalPages})">
                            <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                           </li>`;
      }
    
  
    document.querySelector(".pagination").innerHTML=paginationHTML;
};
const pageClick = (pageNum) => {
    page = pageNum;
    window.scrollTo({ top: 0, behavior: "smooth" });
    getNews();
  };
const moveToPage=(pageNum)=>{
    console.log("move", pageNum);
    page = pageNum;
    getNews(url);
}
getLatesNews();

