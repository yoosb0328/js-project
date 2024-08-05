import { DataStore } from "../data/DataStore.js";
import { CategoryRender } from "../data/Category.js";
import { SaleRender } from "../data/Sale.js";
/*버튼 기능 구현*/
const codeInput = document.querySelector(".category-txt");
const nameInput = document.querySelector(".category-name-txt");
const quantityInput = document.querySelector(".quantity");
const priceInput = document.querySelector(".price");
const descriptionInput = document.querySelector(".description");
let initialCode;
let initialName;
let initialQuantity;
let initialPrice;
let initalDescription;
if (codeInput) {
    initialCode = codeInput.value;
}
if (nameInput) {
    initialName = nameInput.value;
}
if (quantityInput) {
    initialQuantity = quantityInput.value;
}
if (priceInput) {
    initialPrice = priceInput.value;
}
if (descriptionInput) {
    initalDescription = descriptionInput.value;
}

//검색버튼
const searchButton = document.getElementById("search-btn");
if (searchButton) {
    searchButton.addEventListener("click", search);
}
function search(event) {
    // 클릭된 버튼의 data-type 속성 값을 가져옴
    const type = event.target.getAttribute("data-type");
    let result;
    let categoryRender;
    let saleRender;

    // data-type에 따라 분기 처리
    switch (type) {
        case "category":
            const code = document.getElementById("category-code-txt").value;
            const name = document.getElementById("category-name-txt").value;
            result = DataStore.getInstance().searchCategories(code, name);
            //렌더링
            categoryRender = new CategoryRender(result);
            categoryRender.render();
            break;
        case "sale":
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
                .split(",")
                .map((code) => code.trim())
                .filter((code) => code !== "");

            // 적요 추출
            const description = document.querySelector(".memo-txt").value;
            result = DataStore.getInstance().searchSales(fromDate, toDate, codes, description);
            //렌더링
            saleRender = new SaleRender(result);
            saleRender.render();
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
    // 부모 창에 메시지 전송
    if (window.opener) {
        window.opener.postMessage({ type: "checkBoxApplyItems", data: selectedItems }, "*");
    }

    // 팝업 닫기
    window.close();
} //apply()

//신규 버튼
const newButton = document.getElementById("");
//저장버튼
const saveButton = document.getElementById("save-btn");
if (saveButton) {
    saveButton.addEventListener("click", save);
}
function save(event) {
    const type = event.target.getAttribute("data-type");
    let saved;
    switch (type) {
        case "category":
            const codeInput = document.querySelector(".category-txt");
            const nameInput = document.querySelector(".category-name-txt");
            console.log(DataStore.getInstance().categories);
            if (codeInput) {
                // data-mode 속성 가져오기
                const dataMode = codeInput.getAttribute("data-mode");
                if (dataMode === "modify") {
                    //데이터를 수정하는 경우
                    alert("수정되었습니다.");
                    DataStore.getInstance().updateCategoryName(codeInput.value, nameInput.value);
                } else {
                    //데이터를 생성하는 경우
                    saved = DataStore.getInstance().addCategory(codeInput.value, nameInput.value);
                    if (saved === true) {
                        alert("등록되었습니다.");
                    } else alert("코드가 중복되어 생성할 수 없습니다.");
                }
                if (window.opener) {
                    window.opener.location.reload();
                }
                window.close();
            }
            break;
        case "sale":
            console.log("sale save");
            // 판매 데이터를 입력하는 경우
            const yearSelect = document.getElementById("year-select");
            const monthSelect = document.getElementById("month-select");
            const dateInput = document.querySelector(".date-input");
            const dateNumberHidden = document.getElementById("date-num-hidden");
            const categoryInput = document.querySelector(".category-search-input");
            const quantityInput = document.querySelector(".quantity");
            const priceInput = document.querySelector(".price");
            const descriptionInput = document.querySelector(".description");

            const dateNumber = dateNumberHidden.value;
            const categoryCode = categoryInput.value;
            const quantity = parseInt(quantityInput.value, 10);
            const price = parseFloat(priceInput.value);
            const description = descriptionInput.value;

            // data-mode 속성으로 신규 생성인지 수정인지 판단
            const dataMode = dateInput.getAttribute("data-mode");
            if (dataMode === "modify") {
                // 데이터 수정 로직
                DataStore.getInstance().updateSale(
                    dateNumber,
                    categoryCode,
                    quantity,
                    price,
                    description
                );
            } else {
                // 데이터 생성 로직
                saved = DataStore.getInstance().addSale(
                    dateNumber,
                    categoryCode,
                    quantity,
                    price,
                    description
                );
                if (saved === true) {
                    alert("판매 데이터가 저장되었습니다.");
                } else {
                    alert("판매 데이터를 저장하는 데 실패했습니다.");
                }
            }

            // if (window.opener) {
            //     window.opener.location.reload();
            // }
            // window.close();
            break;
        default:
            console.log("data type error");
            break;
    }
}

//선택 삭제 버튼
const deleteButton = document.getElementById("");
//다시 작성 버튼
const rewriteButton = document.getElementById("rewrite-btn");
if (rewriteButton) {
    rewriteButton.addEventListener("click", rewrite);
}
function rewrite(event) {
    const type = event.target.getAttribute("data-type");
    switch (type) {
        case "category":
            const codeInput = document.querySelector(".category-txt");
            const nameInput = document.querySelector(".category-name-txt");
            codeInput.value = initialCode;
            nameInput.value = initialName;
            break;
        case "sale":
            console.log("sale save");
            const quantityInput = document.querySelector(".quantity");
            const priceInput = document.querySelector(".price");
            const descriptionInput = document.querySelector(".description");
            break;
        default:
            console.log("data type error");
            break;
    }
}
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
    console.log(event);

    event.preventDefault(); // 기본 동작 방지

    // 클릭된 버튼의 클래스 이름을 가져오기 (css 구분이 아닌 동작에 따른 클래스명은 항상 제일 앞에 작성)
    const classList = event.target.classList;
    const className = classList[0];
    // 클래스 이름에 따라 팝업을 열기
    switch (className) {
        case "category-btn": //품목 조회 팝업
            alert("품목 조회 팝업 열기");
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
