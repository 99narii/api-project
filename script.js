const API_KEY = `top-headlines`;
let news = []
const getLatesNews = async ()=>{
    const url = new URL (
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("rrr", data.articles);
}
getLatesNews();