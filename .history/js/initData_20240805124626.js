import { DataStore } from "./data/DataStore.js";
import { Category } from "./data/Category.js";
import { Sale, SaleRender } from "./data/Sale.js";

const dates = ["2024-08-04", "2024-08-03", "2024-08-03", "2024-08-02", "2024-08-01", "2024-07-31"];
const names = [
    "진라면",
    "신라면",
    "안성탕면",
    "짜파게티",
    "불닭볶음면",
    "팔도비빔면",
    "코카콜라",
    "새우깡",
    "칙촉",
    "수박바",
];
const descriptions = ["온라인에서 구매함", "직접 마트 방문해서 구매", "특별이벤트로 할인", ""];
const dataStore = new DataStore();

dataStore.loadFromLocalStorage();
if (dataStore.categories.length === 0 && dataStore.sales.length === 0) {
    console.log("init");
    initCategory();
    initSales();
}
dataStore.saveToLocalStorage();

const saleRender = new SaleRender(dataStore.sales);
saleRender.render();

//Category부터 저장.
function initCategory() {
    names.forEach(function (name, index) {
        const code = index <= 5 ? "P10000" + index : "P20000" + index;
        dataStore.categories.push(new Category(code, name));
    });
}

function initSales() {
    const sales = [];
    const totalSalescount = 30; //시작 데이터 30개 임의 생성.

    for (let i = 0; i < totalSalescount; i++) {
        //임의의 날짜
        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        //임의의 카테고리
        const randomCategory =
            dataStore.categories[Math.floor(Math.random() * dataStore.categories.length)];
        //임의의 적요
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        //임의의 수량
        const quantity = Math.floor(Math.random() * 10) + 1;
        //임의의 가격
        const price = (Math.floor(Math.random() * 5) + 1) * 500;
        //객체 생성
        const sale = new Sale(randomDate, randomCategory, quantity, price, randomDescription);

        sales.push(sale);
    }
    //날짜 순 내림차순 정렬(최근 날짜 먼저)
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 생성된 Sales 객체들을 dataStore.sales에 저장
    dataStore.sales = sales;
    return sales;
}
