import { DataStore } from "../data/DataStore.js";
import { CategoryRender } from "../data/Category.js";
/*버튼 기능 구현*/

//검색버튼
const searchButton = document.getElementById("search-btn");
if (searchButton) {
    searchButton.addEventListener("click", search);
}
function search(event) {
    // 클릭된 버튼의 data-type 속성 값을 가져옴
    const type = event.target.getAttribute("data-type");

    // data-type에 따라 분기 처리
    switch (type) {
        case "category":
            const code = document.getElementById("category-code-txt").value;
            const name = document.getElementById("category-name-txt").value;
            console.log(code, name);
            // category 검색 로직
            const result = DataStore.getInstance().searchCategories(code, name);
            const categoryRender = new CategoryRender(result);
            categoryRender.render();
            break;
        default:
            console.log("Unknown search type");
    }
} //search();

//체크박스 선택 후 적용 버튼
const applyButton = document.getElementById("apply-btn");
if (applyButton) {
    applyButton.addEventListener("click", apply);
}
function apply() {
    // 체크박스가 있는 tbody 요소를 가져옵니다.
    const tbody = document.getElementById("common-tbody");
    const checkboxes = tbody.querySelectorAll("input.row-checkbox");

    // 선택된 체크박스의 정보를 저장할 배열
    const selectedItems = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            // 체크박스가 체크된 경우, 해당 행의 정보를 수집합니다.
            const row = checkbox.closest("tr");
            const code = row.querySelector(".item-code").textContent.trim(); // 코드 정보
            const name = row.querySelector(".item-name").textContent.trim(); // 이름 정보
            selectedItems.push({ code, name });
        }
    });

    // 체크된 항목이 3개 이하인지 확인합니다.
    if (selectedItems.length > 3) {
        alert("최대 3개 항목만 선택할 수 있습니다.");
        return;
    }

    // 부모 창에 메시지 전송
    if (window.opener) {
        window.opener.postMessage({ type: "selected-items", data: selectedItems }, "*");
    }

    // 팝업 닫기
    window.close();
} //apply()
//신규 버튼
const newButton = document.getElementById("");
//선택 삭제 버튼
const deleteButton = document.getElementById("");
//팝업 닫는 버튼
const closeButtons = document.querySelectorAll("#close-popup-btn");
closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
});
function closePopup() {
    window.close();
} //closePopup()

//팝업 여는 버튼
const openButtons = document.querySelectorAll("#open-popup-btn");
openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
});

function openPopup(event) {
    event.preventDefault(); // 기본 동작 방지

    // 클릭된 버튼의 클래스 이름을 가져오기 (css 구분이 아닌 동작에 따른 클래스명은 항상 제일 앞에 작성)
    const classList = event.target.classList;
    const className = classList[0];
    // 클래스 이름에 따라 팝업을 열기
    switch (className) {
        case "category-btn": //품목 조회 팝업
            window.open("search-popup.html", "search-popup", "width=600,height=600");
            break;
        case "new-category-btn": //품목 등록 팝업
            window.open("category-input-popup.html", "input-popup", "width=600,height=300");
            break;
        case "new-sale-btn": //판매 데이터 입력 팝업
            window.open("sale-input-popup.html", "sale-input-popup", "width=600,height=600");
            break;
        default:
            console.error("Unknown className:", className);
            break;
    }
} //openPopup()
