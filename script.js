//const API_KEY = ``;
let newsList = []


const menus = document.querySelectorAll(".menus button");
console.log("ddd", menus)
menus.forEach(menu => 
    menu.addEventListener("click", (event)=>getNewsByCategory(event)));

const getLatesNews = async ()=>{
    const url = new URL (
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines`
        // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("카테고리")

    const url = new URL(
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines?category=${category}`)
    const response = await fetch(url)
    const data = await response.json();
    newsList = data.articles;
    render();
}
getNewsByCategory();

const getnewsKeyword = async () => {
    const keyword = document.getElementById("searchInput").value;
    console.log("keyword", keyword)

    const url = new URL(
        `https://luxury-bienenstitch-33fe19.netlify.app/top-headlines?q=${keyword}`)
    const response = await fetch(url)
    const data = await response.json();
    newsList = data.articles;
    render();
}
getnewsKeyword();

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

getLatesNews();

