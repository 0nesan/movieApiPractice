import { Main } from "./main.js"
import getdata from "../getdata.js"

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
            <input class="movie-title" placeholder="검색어를 입력하세요.">
            <select class="type">
                <option value="movie">movie</option>
                <option value="series">series</option>
                <option value="episode">episode</option>
            </select>
            <select class='nums'>
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">30</option>
            </select>
            <select class="years">
                <option value="">All</option>
                ${ years() }
            </select>
            <button>search</button>
        </div>
        
        <div class='movieListWrap'>
            <div class="err-msg">검색해주세요!</div>
        </div>`,
    searchRender() {        
        Main.app.innerHTML = Search.searchInner

        const searchData = async (titleVal, typeVal, yearsVal, numsVal) => {      
            const movieListWrap = document.querySelector('.movieListWrap');
            const data = await getdata(titleVal, typeVal, yearsVal, numsVal)
            const dataInfo = data.Search;
            
            try{
                const movieList = dataInfo.map(e => {
                    e.Poster === 'N/A' ? e.Poster = 'https://t1.daumcdn.net/cfile/tistory/247AD54557E5DF5D21' : e.Poster = e.Poster;
                    
                    return (
                        `
                        <div class="movie-list">
                            <img class="movie-list-poster" src='${e.Poster}' alt'${e.Title + 'Poster'}'>
                            <p class="movie-list-title">${e.Title}${e.Year}</p>
                        </div>
                        `
                    )
                })
                movieListWrap.innerHTML += movieList.join('');
            }catch{
                movieListWrap.innerHTML = `<div class="err-msg">검색 결과가 없습니다.</div>`
            }
        }

        const renderEvent = () => {
            let titleVal = document.querySelector('.movie-title').value;
            let typeVal = document.querySelector('.type').value;
            let numsVal = Number(document.querySelector('.nums').value);
            let yearsVal = document.querySelector('.years').value;
            const movieListWrap = document.querySelector('.movieListWrap');
            movieListWrap.innerHTML = ''

            for(let i = numsVal; i > 0 ; i-- ){
                searchData(titleVal, typeVal, yearsVal, numsVal)
                numsVal--
            }
        }
        
        document.querySelector('button').addEventListener('click', renderEvent)
        document.querySelector('.movie-title').addEventListener('keypress', function(event){
            if(event.keyCode == 13) renderEvent();
        })
    }
}