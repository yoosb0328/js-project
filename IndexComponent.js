import { route } from "./router.js";

export default class IndexComponent {
    constructor(controller) {
        this.controller = controller;
    }
    init() {
        this.render();
    }
    render() {
        this.controller.loadData();
        const data = this.controller.getProduct();
        
        console.log(data);
        const view = document.createElement("div");
        view.innerHTML = `
            <button id="products-link">품목조회</button>
            <button id="sales-link">판매조회</button>
        `;

        view.querySelector("#products-link").addEventListener('click', (event) => {
            event.preventDefault();
            route("/search/product");
        })

        view.querySelector("#sales-link").addEventListener('click', (event) => {
            event.preventDefault();
            route("/search/sale");
        })

        return view;

    }//render()
    
}