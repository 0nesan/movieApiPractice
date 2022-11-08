import { Header } from './header';

export const Main = {
    app: document.querySelector('main'),
    mainRender() {
        Header.headerRoot.innerHTML = ``
        Main.app.innerHTML = Header.headerInner;
    }
}