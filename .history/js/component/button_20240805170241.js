//검색버튼
const searchButton = document.getElementById("");
//체크박스 선택 후 적용 버튼
const applyButton = document.getElementById("");
//신규 버튼
const newButton = document.getElementById("");
//선택 삭제 버튼
const deleteButton = document.getElementById("");

const closeButtons = document.querySelectorAll("#close-popup-btn"); //팝업 닫는 버튼
closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
});
function closePopup() {
    window.close();
}

const openButtons = document.querySelectorAll("#open-popup-btn"); //팝업 여는 버튼
openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
});
