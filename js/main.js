import { headerRender } from './components/header'

const main = document.querySelector('main');
const title = `<h1 class="title">OMDb API</h1> `

const mainRender = () => {
    main.innerHTML =` 
        ${title}
        <ul class="menu-wrap">
            <li class="menu">
                <span>Search</span>
            </li>
            <li class="menu">
                <span>Movies</span>
            </li>
            <li class="menu">
                <span>About</span>
            </li>
        </ul>
    `
}

mainRender();

const menuListHandler = (url) => {
    url = url.target.innerText;

    headerRender();
}

const menuList = document.querySelectorAll('.menu');
menuList.forEach(e => {
    e.addEventListener('click', menuListHandler);
})


export { title, main }