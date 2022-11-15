import { Main } from './components/main.js'
import { Search } from './components/search.js';
import { Header } from './components/header.js';
import { Movies } from './components/movies.js';

// 랜더 함수
const renderContents = () => {
    const { pathname } = window.location;
    switch (pathname) {
        case '/':
            Main.mainRender();
            break;
        case '/search':
            Header.headerRender();
            Search.searchRender();
            break;
        case '/movie':
            Header.headerRender();
            Movies.mainRender();
            break;
        default:
            Header.headerRender();
            Main.app.innerHTML = `
            <div class='err-404'>
                <p class="err-code">404</p>
                <p class="err-msg">Page Not Found!<p/>
            </div>`;
    }
    if(pathname !== `/search`) removeScrollEl();

    const headerTitle = document.querySelector('.title');
    if(headerTitle) menuEventListener()
};

const removeScrollEl = () => {
    document.querySelector(`.scroll`) !== null ? document.body.removeChild(document.querySelector(`.scroll`)) : null;
}

const menuEventListener = () => {
    const title = document.querySelector('.title');
    const menuList = document.querySelectorAll('.menu span');
    title.addEventListener("click", locationChange);
    menuList.forEach(e => {
        const { pathname } = window.location;
        e.classList.remove('click')

        if(`/${e.innerText.toLowerCase()}` === pathname) e.classList.add('click'); 
        e.addEventListener('click', locationChange);
    });
}

export function locationChange(e) {
        let text = e.target.innerText;
        let hrefVal = '';

        if(text === 'OMDb API' ) hrefVal = '/'
        if(text === 'Search' ) hrefVal = '/search'
        if(text === 'Movie' ) hrefVal = '/movie'
        if(e.target.classList.contains('movie-list')) hrefVal = '/movie'

        const targetUrl = hrefVal;
        const { pathname } = window.location;
    
        if (targetUrl === pathname) {
            return;
        }        

        const locationChangeEvent = new CustomEvent("locationchange", {
            composed: true,
            detail: { href: hrefVal },
        });
        
        window.dispatchEvent(locationChangeEvent);
}

const handleLocationChange = (e) => {
    const { href } = e.detail;
    
    window.history.pushState(undefined, "타이틀", href);
    renderContents();
};

window.addEventListener("locationchange", handleLocationChange);

window.addEventListener("popstate", () => {
    renderContents();
});

// 초기 랜더
renderContents()