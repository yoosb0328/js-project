import { DataStore } from "./data/DataStore.js";

const openButtons = document.querySelectorAll("#open-popup-btn"); //팝업 여는 버튼

openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
});

function openPopup(event) {
    event.preventDefault(); // 기본 동작 방지

    // 클릭된 버튼의 클래스 이름을 가져오기
    const className = event.target.className;
    console.log(className);
    // 클래스 이름에 따라 팝업을 열기
    switch (className) {
        case "category-btn":
            // const popup = await window.open("search-popup.html", "search-popup", "width=600,height=600");
            const popup = openPopup("search-popup.html", "search-popup", "width=600,height=600");
            popup.postMessage({ type: "categories", data: DataStore.getInstance().categories });
            break;
        case "new-category-btn":
            window.open("input-popup.html", "input-popup", "width=600,height=300");
            break;
        default:
            console.error("Unknown className:", className);
    }
}
async function open(html, name, size) {
    return await window.open(html, name, size);
}
const closeButtons = document.querySelectorAll("#close-popup-btn"); //팝업 닫는 버튼

closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
});

function closePopup() {
    window.close();
}
