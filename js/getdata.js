import { apiKey } from './apikeys'
import { Main } from './components/main'

let searchVal;
export const getMovies = (movieName, type, nums) => {
    return new Promise(resolve => {
        if(nums === 10){
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}=${movieName}&type=${type}`)
            .then(res => res.json())
            .then(res => {
                const { pathname } = window.location;
                switch (pathname) {
                    case '/search':
                        const movieListWrap = document.querySelector('.movieListWrap');

                        try {
                            const data = res.Search.map(e => (
                                `<div>
                                    <img src="${e.Poster}" alt="${e.Title}">
                                    <p>${e.Title}</p>
                                    <p>${e.Year}</p>
                                    <p>${e.Type}</p>
                                </div>`
                            ));
                            let page1 = data.join('')
                            movieListWrap.innerHTML = page1;
                        }catch{
                            console.log('검색결과 없습니다')
                        }finally{
                            
                        }
                        break;
                    case '/movies':
                        break;
                    default:
                        Main.app.innerHTML = "<div>404</div>";
                }
            })
        }else if(nums === 20){
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}=${movieName}&type=${type}&page=2`)
        .then(res => res.json())
        .then(res => {
            const { pathname } = window.location;
            switch (pathname) {
                case '/search':
                    const movieListWrap = document.querySelector('.movieListWrap');

                    try {
                        const data = res.Search.map(e => (
                            `<div>
                                <img src="${e.Poster}" alt="${e.Title}">
                                <p>${e.Title}</p>
                                <p>${e.Year}</p>
                                <p>${e.Type}</p>
                            </div>`
                        ));
                        let page1 = data.join('')
                        movieListWrap.innerHTML = page1;
                    }catch{
                        console.log('검색결과 없습니다')
                    }finally{
                        
                    }
                    break;
                case '/movies':
                    break;
                default:
                    Main.app.innerHTML = "<div>404</div>";
            }
        })
    }
})
}
export {searchVal};