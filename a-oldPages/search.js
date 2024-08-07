import { SaleRender } from "./js/data/Sale.js";
import { DataStore } from "./js/data/DataStore.js";

console.log("search.js");
//초기 데이터 렌더링.(table + paging)
let saleRender = new SaleRender(DataStore.getInstance().sales);
saleRender.render();

//버튼에 이벤트 add

//검색 버튼
const searchButton = document.getElementById("search-btn");
if (searchButton) {
    searchButton.addEventListener("click", search);
}
function search() {
    // 기간 추출
    const fromYear = document.querySelector("#year-select-from").value;
    const fromMonth = document.querySelector("#month-select-from").value;
    const fromDay = document.querySelector("#date-input-from").value;

    const toYear = document.querySelector("#year-select-to").value;
    const toMonth = document.querySelector("#month-select-to").value;
    const toDay = document.querySelector("#date-input-to").value;

    const fromDate = `${fromYear}-${fromMonth.padStart(2, "0")}-${fromDay.padStart(
        2,
        "0"
    )}`;
    const toDate = `${toYear}-${toMonth.padStart(2, "0")}-${toDay.padStart(2, "0")}`;
    // 품목 (코드) 추출
    const categoryInput = document.getElementById("category-search-input");
    const codes = categoryInput.value
        .split(" ")
        .map((code) => code.trim())
        .filter((code) => code !== "");
    // 적요 추출
    const description = document.querySelector(".memo-txt").value;
    //검색
    const result = DataStore.getInstance().searchSales(fromDate, toDate, codes, description);

    //렌더링
    saleRender = new SaleRender(result);
    saleRender.render();
}
//찾기 버튼 (품목 조회 팝업 열기)
const openButton = document.getElementById("open-popup-btn");
if(openButton) openButton.addEventListener("click", openPopup);
function openPopup() {
    window.open("search-popup.html", "search-popup", "width=600,height=600");
} //openPopup()
/*
data-date-number="${sale.dateNumber}" 
                        data-date="${sale.date}"
                        data-category-code="${sale.category.code}" 
                        data-category-name="${sale.category.name}" 
                        data-quantity="${sale.quantity}" 
                        data-price="${sale.price}" 
                        data-description="${sale.description}">
*/
//각 row 전표번호 버튼
const dateNumberRow = document.querySelectorAll(".date-number-link");
if(dateNumberRow) dateNumberRow.forEach((row)=> {
    const dateNumber = row.getAttribute("data-date-number");
    const date = row.getAttribute("data-date");
    const categoryCode = row.getAttribute("data-category-code");
    const quantity = row.getAttribute("quantity");
    const price = row.getAttribute("price");
    const description = row.getAttribute("description");
    const mode = "modify";
    row.addEventListener("click", openSaleModifyPopup);
})
function openSaleModifyPopup(event) {
    console.log("openSaleInputPopup");

    const row = event.target;
    const dateNumber = row.getAttribute("data-date-number");
    const date = row.getAttribute("data-date").split("-");
    const categoryCode = row.getAttribute("data-category-code");
    const quantity = row.getAttribute("data-quantity");
    const price = row.getAttribute("data-price");
    const description = row.getAttribute("data-description");
    const mode = "modify";

    const url = new URL("sale-input-popup.html", window.location.origin);
    
    // 쿼리 문자열 추가
    url.searchParams.append("dateNumber", encodeURIComponent(dateNumber));
    url.searchParams.append("date", encodeURIComponent(date));
    url.searchParams.append("categoryCode", encodeURIComponent(categoryCode));
    url.searchParams.append("quantity", encodeURIComponent(quantity));
    url.searchParams.append("price", encodeURIComponent(price));
    url.searchParams.append("description", encodeURIComponent(description));
    url.searchParams.append("mode", encodeURIComponent(mode));

    // 팝업 창 열기
    window.open(url.href, "sale-input-popup.html", "width=600,height=400");
}
//신규 버튼
const newButton = document.getElementById("new-sale-btn");
if(newButton) newButton.addEventListener("click", openSaleInputPopup);
function openSaleInputPopup() {
    window.open("sale-input-popup.html", "sale-input-popup", "width=600,height=600");
}

//삭제 버튼