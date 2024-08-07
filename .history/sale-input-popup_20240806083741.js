import { DataStore } from "./js/data/DataStore.js";

const urlParams = new URLSearchParams(window.location.search);

const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");
const dayInput = document.getElementById("date-input");
const categoryInput = document.getElementById("category-search-input");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const openCategoryPopupButton = document.getElementById("open-popup-btn");
const dateNumber = decodeURIComponent(urlParams.get("dateNumber")).trim();
// const date = decodeURIComponent(urlParams.get("date")).split(",");

const dateParam = decodeURIComponent(urlParams.get("date")).trim();
const date = dateParam.split(","); // 구분자를 ,로 변경

const categoryCode = decodeURIComponent(urlParams.get("categoryCode")).trim();
const quantity = decodeURIComponent(urlParams.get("quantity")).trim();
const price = decodeURIComponent(urlParams.get("price")).trim();
const description = decodeURIComponent(urlParams.get("description")).trim();
const mode = decodeURIComponent(urlParams.get("mode")).trim();

console.log("date:", date); // 디버깅을 위한 출력

let initQuantity = "",
    initPrice = "",
    initDesc = ""; //초기값.
if (mode === "modify") {
    // 수정 모드
    // 값 설정
    if (date.length === 3) {
        const year = date[0];
        const month = parseInt(date[1], 10); // 숫자로 변환하여 앞의 0 제거
        const day = parseInt(date[2], 10); // 숫자로 변환하여 앞의 0 제거
        yearSelect.value = year;
        monthSelect.value = month < 10 ? `${month}` : month; // 앞에 0 추가
        dayInput.value = day < 10 ? `${day}` : day; // 앞에 0 추가
        // alert(year, month, day);
    }

    categoryInput.value = categoryCode;
    quantityInput.value = quantity;
    initQuantity = quantity;
    priceInput.value = price;
    initPrice = price;
    descriptionInput.value = description;
    initDesc = description;

    // 필드 readonly 설정
    yearSelect.setAttribute("disabled", true);
    monthSelect.setAttribute("disabled", true);
    dayInput.setAttribute("readonly", true);
    categoryInput.setAttribute("readonly", true);
    openCategoryPopupButton.setAttribute("disabled", true);

    //저장 버튼
    const saveButton = document.getElementById("save-btn");
    saveButton.addEventListener("click", save);
    function save() {
        const result = DataStore.getInstance().updateSale(
            dateNumber,
            categoryCode,
            quantity,
            price,
            description
        );
        if (result === true) {
            alert("수정이 완료되었습니다.");
            if (window.opener) {
                // window.opener.location.reload();
                // window.close();
            }
        } else {
            alert("수정에 실패했습니다.");
            // window.opener.location.reload();
            // window.close();
        }
    }
    //삭제 버튼
} else {
    //저장 모드
}

//모드 상관 없이 같은 동작 버튼
//다시 작성 버튼
const rewriteButton = document.getElementById("rewrite-btn");
rewriteButton.addEventListener("click", rewrite);
function rewrite() {
    quantityInput.value = initQuantity;
    priceInput.value = initPrice;
    descriptionInput.value = initDesc;
}
//닫기 버튼
const closeButton = document.getElementById("close-popup-btn");
closeButton.addEventListener("click", () => window.close());

//문자열 검사
function logStringDetails(str, name) {
    console.log(`${name} length:`, str.length);
    console.log(`${name} content:`, [...str].map((char) => char.charCodeAt(0)).join(" "));
}
