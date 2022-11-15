import { Main } from "./main.js"
import getdata from "../getdata.js"
import { getIdVal, getTitleVal } from "./search.js"
import Loading from "../loading.js"

export const Movies = {
    movieInner: `
        <div class="movie-wrap"></div>
    `,
    mainRender() {
        Main.app.innerHTML = Movies.movieInner;
        const movieWrap = document.querySelector('.movie-wrap')
        const loader = new Loading({ el: `.loading`});
        const movieData = async () => {
            try{
                loader.start();
                const data = await getdata(0,0,0,0,getIdVal,getTitleVal)
                console.log(data);
                console.log(data.Ratings[0])

                const ratings = () => {
                    let source = []
                    let value = []
                    let ratings = '';
                    
                    for(let x of data.Ratings){
                        source.push(x.Source);
                        value.push(x.Value);
                    }

                    let image;
                    for(let i = 0; i < source.length; i++){
                        switch(source[i]){
                            case 'Internet Movie Database' :
                                image = 'https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/Internet Movie Database.png'
                                break
                            case 'Rotten Tomatoes' :
                                image = 'https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/Rotten Tomatoes.png'
                                break
                            case 'Metacritic' :
                                image = 'https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/Metacritic.png'
                                break
                            default : 
                                image = '';
                        }

                        ratings += `
                            <div class="rating-wrap">
                                <img src='${image}' alt='${source[i]}'>
                                <span>${value[i]}</span>
                            </div>
                        `
                    }
                    return ratings
                }
                
                const movieInfo = `
                    <img class="movie-img" src='${data.Poster}'>
                    <div class="movie-info-wrap">
                        <h2 class="movie-title">${data.Title}</h2>

                        <ul class="movie-date">
                            <li>${data.Released}</li>
                            <li>${data.Runtime.replace(' ','')}</li>
                            <li>${data.Country}</li>
                        </ul>

                        <div>
                            <p>${data.Plot}</p>
                        </div>

                        <div class="movie-ratings">
                            <h3>Ratings</h3>
                            <div>
                                ${ratings()}
                            </div>
                        </div>

                        <div>
                            <h3>Actors</h3>
                            <p>${data.Actors}</p>
                        </div>

                        <div>
                            <h3>Production</h3>
                            <p>${data.Production === 'N/A' ? 'No information' : data.Production }</p>
                        </div>

                        <div>
                            <h3>Genre</h3>
                            <p>${data.Genre}</p>
                        </div>
                    </div>
                `
                movieWrap.innerHTML = movieInfo;
                loader.stop();
            }catch(err){
                loader.stop();
                movieWrap.innerHTML = `
                    <div class="err-movie">
                        상세 조회 내역이 없습니다.
                        <p>영화 썸네일 클릭을 통해 조회하실 수 있습니다.<p>
                    <div>`;
            }
        }
        movieData()
    }
}