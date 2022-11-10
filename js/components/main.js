import { Header } from './header';

export const Main = {
    app: document.querySelector('main'),
    mainRender() {
        Header.headerRoot.innerHTML = ``
        Main.app.innerHTML = `
        ${Header.headerInner}
        <div class="bg-box">
            <div class="bg-img"> </div>
        </div>
        `;
    }
}