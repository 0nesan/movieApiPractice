import { apiKey } from './apikeys.js'
import { Main } from './components/main'

export default async (movieName, movieType, movieYear, nums, movieId, getMovieTitle) => {
    try {
        const url = `https://www.omdbapi.com/`
        const apikey = `?apikey=${apiKey}&`
        const title = `s=${movieName};`
        const getTitle = `&t=${getMovieTitle};`
        const type = `&type=${movieType}`
        const page = `&page=${nums}`
        const year = `&y=${movieYear}`
        const id = `&i=${movieId}`
        const plot = `&plot=full`
        let response;
        let data;
        const { pathname } = window.location;
        switch (pathname) {
            case '/search':
                response = await fetch(`${url + apikey + title + type + year + page }`);
                data = await response.json();
                return data;
            case '/movie':
                response = await fetch(`${url + apikey + id + getTitle + plot}`);
                data = await response.json()
                return data;
            default:
                Main.app.innerHTML = `
                <div class='err-404'>
                    <p class="err-code">404</p>
                    <p class="err-msg">Page Not Found!<p/>
                </div>
            `
        }
    } catch (err){
        Main.app.innerHTML =`
        <div class='err-404'>
            <p class="err-code">404</p>
            <p class="err-msg">Page Not Found!<p/>
        </div>`;
    }  
};

