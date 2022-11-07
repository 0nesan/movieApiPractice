import { title } from "../main.js"

export const headerRender = () => {
    const header = document.querySelector('header');
    header.innerHTML = `
        ${title}
    ` 
}