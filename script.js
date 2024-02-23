let newsList = []
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => 
    menu.addEventListener("click", (event)=>getNewsByCategory(event)));
const mySidenav = document.querySelectorAll(".mySidenav button");
mySidenav.forEach(menu => 
    menu.addEventListener("click", (event)=>getNewsByCategory(event)));
let url= new URL(`https://luxury-bienenstitch-33fe19.netlify.app/top-headlines`);

function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}
function closeNav() {
document.getElementById("mySidenav").style.display = "none";
}
    
const getNews = async (url) => {
    try{
    const response = await fetch(url);
    const data = await response.json();

    if(response.status === 200) {
        if(data.articles.length === 0) {
            console.log("검색결과 없음")
            throw new Error("뉴스가 없습니다.")

        }
        newsList = data.articles;
        render();
    }else {
        throw new Error(data.message)
    }
    }catch (error) {
        errorRender(error.message);
    }
};  //카테고리와 검색에서는 오류발생함

const getLatesNews = async ()=>{
    const url = new URL (
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines`
        // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    );
    getNews(url);
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    const sidecategory = event.target.textContent.toLowerCase();
    console.log("카테고리")
    const url = new URL(
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines?category=${category||sidecategory}`);
        getNews(url);
 
}

const getnewsKeyword = async () => {
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

getLatesNews();

