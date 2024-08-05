/*버튼 기능 구현*/

//검색버튼
const searchButton = document.getElementById("");
//체크박스 선택 후 적용 버튼
const applyButton = document.getElementById("");
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
}

//팝업 여는 버튼
const openButtons = document.querySelectorAll("#open-popup-btn");
openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
});

function openPopup(event) {
    event.preventDefault(); // 기본 동작 방지

    // 클릭된 버튼의 클래스 이름을 가져오기
    // const className = event.target.className;
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
    }
}
