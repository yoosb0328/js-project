import { DataStore } from "../data/DataStore.js";
import { Category } from "../data/Category.js";
import { Sale, SaleRender } from "../data/Sale.js";

const dates = ["2024-08-04", "2024-08-03", "2024-08-03", "2024-08-02", "2024-08-01", "2024-07-31"];
const names = [
    "진라면",
    "신라면",
    "안성탕면",
    "짜파게티",
    "불닭볶음면",
    "팔도비빔면",
    "코카콜라",
    "스프라이트",
    "새우깡",
    "칙촉",
    "수박바",
    "메로나",
    "바밤바",
];
const descriptions = ["온라인에서 구매함", "직접 마트 방문해서 구매", "특별이벤트로 할인", ""];
const dataStore = DataStore.getInstance();
const localStorageData = localStorage.getItem("appData");
if (!localStorageData) {
    console.log("초기 데이터 생성 ");
    //로컬 스토리지가 비어있는 경우
    //메모리에 초기 데이터를 생성하고
    initCategory();
    initSales();
    dataStore.saveToLocalStorage(); //로컬스토리지에 저장
} else {
    //로컬 스토리지에 데이터가 있는데
    if (dataStore.categories.length === 0 && dataStore.sales.length === 0) {
        //메모리가 빈 경우.
        dataStore.loadFromLocalStorage(); //로컬 스토리지에서 데이터를 불러온다.
        dataStore.saveToLocalStorage();
    }
}

const saleRender = new SaleRender(dataStore.sales);
saleRender.render();

//Category부터 저장.
function initCategory() {
    const categories = [];
    names.forEach(function (name, index) {
        const code = index <= 5 ? "P10000" + index : "P20000" + index;
        DataStore.getInstance().categories.set(name, code);
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
        //해당 날짜가 같은 객체가 몇 개인지 검색.
        const number = DataStore.getInstance().countNumber(randomDate);
        //객체 생성
        DataStore.getInstance().sales.push(
            new Sale(randomDate, number, randomCategory, quantity, price, randomDescription)
        );
    }
    //날짜 순 내림차순 정렬(최근 날짜 먼저)
    // 생성된 Sales 객체들을 dataStore.sales에 저장
    sales.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sales;
}
