import { apiKey } from './apikeys.js'
import { Main } from './components/main'

export default async (movieName, movieType, movieYear, nums) => {
    try {
        const url = `https://www.omdbapi.com/`
        const apikey = `?apikey=${apiKey}&`
        const title = `s=${movieName};`
        const type = `&type=${movieType}`
        const page = `&page=${nums}`
        const year = `&y=${movieYear}`
        let response;
        let data;
        const { pathname } = window.location;
        switch (pathname) {
            case '/search':
                response = await fetch(`${url + apikey + title + type + year + page }`);
                data = await response.json();
                return data;
            case '/movies':
                break;
            default:
                Main.app.innerHTML = "<div>404</div>";
        }
        
    } catch (err){
        alert('영화정보를 불러올 수 없습니다!', err);
    }  
};

