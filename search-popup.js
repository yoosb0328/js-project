import { CategoryRender } from "./js/data/Category.js";
import { DataStore } from "./js/data/DataStore.js";

console.log("search-popup.js");
//초기 데이터 렌더링.(table + paging)
let categoryRender = new CategoryRender(DataStore.getInstance().categories);
categoryRender.render();

//검색 버튼
const searchButton = document.getElementById("search-btn");
if (searchButton) {
    searchButton.addEventListener("click", search);
}
function search() {
    const code = document.getElementById("category-code-txt").value.trim();
    const name = document.getElementById("category-name-txt").value.trim();
    const result = DataStore.getInstance().searchCategories(code, name);
    //렌더링
    categoryRender = new CategoryRender(result);
    categoryRender.render();
}

//체크박스 선택 후 적용 버튼
const applyButton = document.getElementById("apply-btn");
if (applyButton) {
    applyButton.addEventListener("click", apply);
}
function apply() {
    console.log("apply!");
    // 체크박스가 있는 tbody 요소를 가져옵니다.
    const tbody = document.getElementById("common-tbody");
    const checkboxes = tbody.querySelectorAll("input.row-checkbox");

    // 선택된 체크박스의 정보를 저장할 배열
    const selectedItems = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            const row = checkbox.closest("tr"); //checkbox에서 가장 가까운 로우
            const code = row.querySelector(".category-code").textContent.trim(); // 코드 정보
            const name = row.querySelector(".category-name").textContent.trim(); // 이름 정보
            selectedItems.push({ code, name });
            console.log(code, name);
        }
    });

    // 체크된 항목이 3개 이하인지 확인합니다.
    if (selectedItems.length > 3) {
        alert("최대 3개 항목만 적용할 수 있습니다!");
        return;
    }
    // 부모 창에 렌더링
    if (window.opener) {
        const categoryInput = window.opener.document.getElementById("category-search-input");
        categoryInput.value = "";
        selectedItems.forEach((item) => {
            categoryInput.value += `${item.code}`+" ";
        })
    }
    // 팝업 닫기
    window.close();
} //apply()
