import { Category } from "./Category.js";
import { Sale } from "./Sale.js";

export class DataStore {
    constructor() {
        this.categories = [];
        this.sales = [];
    }

    /* 
    메모리 데이터 조작.
    */
    addItem(category) {
        //코드가 같은 카테고리가 있는 지 중복 체크
        const exist = this.categories.findIndex((c) => c.code === category.code);
        if (exist === -1) this.categories.push(category);
    }

    addSale(sale) {
        //일자+번호가 같은 카테고리가 있는 지 중복 체크
        const exist = this.sales.findIndex((s) => s.dateNumber === sale.dateNumber);
        if (exist === -1) this.sales.push(sale);
    }

    //카테고리명이 바뀌면 판매 정보 데이터도 수정.
    updateSalesByName(code, name) {
        this.sales.forEach((sale) => {
            if (sale.category.code === code) {
                sale.category.name = name;
            }
        });
    }

    /*
    로컬 스토리지 데이터 조작
    */

    // JSON.stringify로 변환하여 로컬 스토리지에 저장
    saveToLocalStorage() {
        const data = {
            categories: this.categories.map((category) => ({
                code: category.code,
                name: category.name,
            })),
            sales: this.sales.map((sale) => ({
                dateNumber: sale.dateNumber,
                category: sale.category,
                quantity: sale.quantity,
                price: sale.price,
                description: sale.description,
            })),
        };
        console.log("saveToLocal : " + data);
        localStorage.setItem("appData", JSON.stringify(data));
    }

    // 로컬 스토리지에서 데이터를 불러와 메모리에 할당
    loadFromLocalStorage() {
        const data = localStorage.getItem("appData");

        if (data) {
            const parsedData = JSON.parse(data);
            // 로컬 스토리지에서 가져온 데이터를 categories와 sales로 분리합니다.
            if (parsedData.categories) {
                this.categories = parsedData.categories.map(
                    (cat) => new Category(cat.code, cat.name)
                );
            }
            //sales에 저장해야 함.
            if (parsedData.sales) {
                console.log(parsedData.sales);
                this.sales = parsedData.sales.map((sale) => {
                    const category = this.categories.find(
                        (cat) => cat.getCode() === sale.category.getCode()
                    );
                    return new Sale(
                        sale.date,
                        category,
                        sale.quantity,
                        sale.price,
                        sale.description
                    );
                });
            }
            this.sales.sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log("loadFromLocal : " + data);
        }
    } //loadFromLocalStorage()
}
