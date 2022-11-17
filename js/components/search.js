import { Main } from "./main.js"
import getdata from "../getdata.js"
import Loading from "../loading.js"
import { locationChange } from "../app"

//연도 값
let year = 2022;
const years = () => {
    let option = ''
    for( let i = year; i > 1980 ; i--){
        option += `<option value=${year--}>${year}</option>`
    }
    return option;
}

// 영화 아이디,이름값
export let getIdVal = '';
export let getTitleVal = '';

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
        const scrollEl = document.createElement('div');
        scrollEl.classList.add('scroll');
        document.querySelector(`.scroll`) === null ? document.body.appendChild(scrollEl) : null;
        let listLag ;
        let dataTotal ;
        const searchData = async (titleVal, typeVal, yearsVal, numsVal) => {      
            try{
                const movieListWrap = document.querySelector('.movieListWrap');
                const data = await getdata(titleVal, typeVal, yearsVal, numsVal)
                const dataInfo = data.Search;
                if(dataInfo === undefined && numsVal > 1) return 
                dataTotal = Number(data.totalResults);
                console.log(dataTotal);
                console.log(listLag);

                const movieList = dataInfo.map(e => {
                    e.Poster === 'N/A' ? e.Poster = 'https://t1.daumcdn.net/cfile/tistory/247AD54557E5DF5D21' : e.Poster = e.Poster;

                    return (
                        `
                        <div class="movie-list" movieid='${e.imdbID}' movietitle="${e.Title}">
                            <img class="movie-list-poster" src='${e.Poster}' alt'${e.Title + 'Poster'}'>
                            <p class="movie-list-title">${e.Title}${e.Year}</p>
                        </div>
                        `
                    )
                })
                movieListWrap.innerHTML += movieList.join('');
            }catch(err){
                movieListWrap.innerHTML = `<div class="err-msg">'${titleVal}'에 대한 검색 결과가 없습니다.</div>`
            }
        }
        
        //벨류값 셋팅
        let titleVal,typeVal,numsVal,yearsVal,movieListWrap = '';
        const valueSetting = () => {
            titleVal = document.querySelector('.movie-title').value;
            typeVal = document.querySelector('.type').value;
            numsVal = Number(document.querySelector('.nums').value);
            yearsVal = document.querySelector('.years').value;
            movieListWrap = document.querySelector('.movieListWrap');
        }
        
        // 비교군 변수값 초기화
        let type = '', title = '', years = '', nums = '' ;
        // 로딩 생성
        const loader = new Loading({ el: `.loading`});
        const renderEvent = async (e, scroll) => {
            //중복 검색 리턴
            if(titleVal === title && typeVal === type && yearsVal === years && numsVal === nums && e === 1){
                return a = false;
            } else {
                //로딩 시작
                loader.start();
                //검색으로 불러올 때
                if(e === 1) { 
                    movieListWrap.innerHTML = '';
                    let num = 0;
                    for(let i = numsVal; i > 0 ; i-- ){
                        num++
                        await searchData(titleVal, typeVal, yearsVal, num)
                    }
                    //스크롤로 불러올 때
                }else{ 
                    await searchData(titleVal, typeVal, yearsVal, scroll)
                }
                //로딩 종료
                loader.stop();
            }
            // 비교군 변수값 할당
            title = titleVal, type = typeVal, years = yearsVal, nums = numsVal;
            
            // 상세 페이지 이동 및 아이디, 타이틀 속성값 추가
            const movieList = document.querySelectorAll('.movie-list');
            listLag =  Number(document.querySelectorAll('.movie-list').length);
            if(movieList !== null) {
                movieList.forEach(e => {
                    e.addEventListener('click', idPush)
                    e.addEventListener('click', locationChange)
                });
            }
        }

        // 아이디,타이틀 가져오기
        const idPush = (e) => {
            getIdVal = e.target.getAttribute('movieid');
            getTitleVal = e.target.getAttribute('movietitle')
        }

        // 무한 스크롤
        const scroll = () => {
            const box = document.querySelector('.scroll');
            
            const io = new IntersectionObserver( (entries, observer)=> {
                const { pathname } = window.location;
                let movieList = document.querySelector('.movie-list');
                if (entries[0].isIntersecting) {
                    if( dataTotal !== undefined && listLag === dataTotal ) {
                        null
                    }else if(pathname === '/search' && movieList !== null && titleVal !== undefined){
                        const scroll = document.documentElement.scrollTop;
                        window.scrollTo(0, scroll - 5)
                    
                        numsVal++
                        renderEvent(0, numsVal)
                    }
                } 
            },{threshold: 0.5});
            io.observe(box);
        }
        scroll();
        
        document.querySelector('button').addEventListener('click', function(){
            valueSetting();
            renderEvent(1)
        })
        document.querySelector('.movie-title').addEventListener('keypress', function(event){
            if(event.keyCode == 13) {
                valueSetting();
                renderEvent(1)
            };
        })
    },
}