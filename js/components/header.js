export const Header = {
    headerRoot : document.querySelector('header'),
    headerInner : `
        <div class="header-wrap">
            <h1 class="title">OMDb API</h1>
            
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
        </div>`,
    headerRender() {
        Header.headerRoot.innerHTML = Header.headerInner; 
    }
}