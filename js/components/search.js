import { Main } from "./main.js"

export const Search = {
    serchInner : `
        <div class="search-input-wrap">
            <input class="" placeholder="검색어를 입력하세요.">
            <select class="type">
                <option value="movie">movie</option>
                <option value="series">series</option>
                <option value="episode">episode</option>
            </select>
            <select>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <select>
                <option value="All">All Years</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </div>`,
    searchRender() {
        Main.app.innerHTML = `
        ${Search.serchInner}`
    }
}