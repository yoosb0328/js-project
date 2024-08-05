import { Category } from "./Category.js";
import { DataStore } from "./DataStore.js";

export class Sale {
    constructor(date, category, quantity, price, description) {
        this.dateNumber = date + "-" + this.getNextNumber(date);
        this.date = date;
        this.category = category; // category 객체를 참조
        this.quantity = quantity;
        this.price = price;
        this.description = description;
    }

    getNextNumber(date) {
        dataStore.loadFromLocalStorage();
        const sameDateSales = dataStore.sales.filter((sale) => sale.date === date); //sale.date === date를 만족하는 요소가 담긴 배열 반환.
        return sameDateSales.length + 1; // 다음 순번
    }

    //toJSON overriding
    toJSON() {
        return {
            dateNumber: this.dateNumber,
            category: {
                code: this.category.code,
                name: this.category.name,
            },
            quantity: this.quantity,
            price: this.price,
            description: this.description,
        };
    }
}

export class SaleRender {
    constructor(sales) {
        this.sales = sales;
        this.currentPage = 1;
        this.itemsPerPage = 10;

        this.initEventListeners();
    }

    initEventListeners() {
        const prevButton = document.querySelector("#sales-prev-button");
        const nextButton = document.querySelector("#sales-next-button");

        prevButton.addEventListener("click", this.goToPrevPage.bind(this));
        nextButton.addEventListener("click", this.goToNextPage.bind(this));
    }

    render() {
        console.log("render");
        const startIndex = (this.currentPage - 1) * this.itemsPerPage; //처음에는 0에서 시작.
        const endIndex = startIndex + this.itemsPerPage; //처음에는 10
        const currentSales = this.sales.slice(startIndex, endIndex); //0~9까지 slice하게 됨.

        const tbody = document.getElementById("sales-tbody");

        tbody.innerHTML = "";

        currentSales.forEach((sale) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="center-align-cell"><input class="row-checkbox" type="checkbox"></td>
                <td class="center-align-cell date-num">${sale.dateNumber}</td>
                <td class="left-align-cell">${sale.category.code}</td>
                <td class="left-align-cell">${sale.category.name}</td>
                <td class="right-align-cell">${sale.quantity}</td>
                <td class="right-align-cell">${sale.price}</td>
                <td class="left-align-cell">${sale.description}</td>
            `;
            tbody.appendChild(row);
        });

        // 버튼 활성화 상태 업데이트
        this.updateButtons();
    }

    updateButtons() {
        const prevButton = document.querySelector("#sales-prev-button");
        const nextButton = document.querySelector("#sales-next-button");

        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled = this.currentPage === Math.ceil(this.sales.length / this.itemsPerPage);
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }

    goToPrevPage() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    goToNextPage() {
        if (this.currentPage < Math.ceil(this.sales.length / this.itemsPerPage)) {
            this.setPage(this.currentPage + 1);
        }
    }
}
