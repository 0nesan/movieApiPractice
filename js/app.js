import { Main } from './components/main.js'
import { Search } from './components/search.js';
import { Header } from './components/header.js';

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
        case '/movies':
            Header.headerRender();
            break;
        case '/about':
            Header.headerRender();
            break;
        default:
            Main.app.innerHTML = "<div>404</div>";
    }

    setTimeout(() => {
        menuEventListener()
    },100)
};

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

function locationChange(e) {
        let text = e.target.innerText;
        let hrefVal = '';

        if(text === 'OMDb API' ) hrefVal = '/'
        if(text === 'Search' ) hrefVal = '/search'
        if(text === 'Movies' ) hrefVal = '/movies'
        if(text === 'About' ) hrefVal = '/about'

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