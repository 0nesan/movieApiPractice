export default class Loading {
    constructor(options) {
        const { el : element = null } = options;
        this.el = document.querySelector(element);
        this.el.innerHTML = `
            <div class='loading-bg'> </div>
        `
    }

    start(){
        this.el.classList.add('start')
    }
    stop(){
        this.el.classList.remove('start')
    }
}