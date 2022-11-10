import { Main } from "./main.js"
import { getMovies, searchVal } from "../getdata"

let year = 2022;
const years = () => {
    let option = ''
    for( let i = year; i > 1980 ; i--){
        option += `<option value=${year--}>${year}</option>`
    }
    return option;
}

export const Search = {
    searchInner :`
        <div class="search-input-wrap">
            <input class="movieTitle" placeholder="검색어를 입력하세요.">
            <select class="type">
                <option value="movie">movie</option>
                <option value="series">series</option>
                <option value="episode">episode</option>
            </select>
            <select class='nums'>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <select class="years">
                <option value="All">All Years</option>
                ${ years() }
            </select>
            <button>search</button>
        </div>
        
        </div>
        
        <div class='movieListWrap'>`,
    searchRender() {        
        Main.app.innerHTML = Search.searchInner;
        const searchData = async () => {
            let titleVal = document.querySelector('.movieTitle').value;
            let typeVal = document.querySelector('.type').value;
            let numsVal = document.querySelector('.nums').value;
            let yearsVal = document.querySelector('.years').value;

            await getMovies(titleVal, typeVal, numsVal);
        }
        document.querySelector('button').addEventListener('click',searchData)
    }
}