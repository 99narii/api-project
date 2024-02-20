const API_KEY = `top-headlines`;
let newsList = []
const getLatesNews = async ()=>{
    const url = new URL (
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("rrr", newsList);
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

getLatesNews();