import diContainer from "./common/DIContainer.js";

console.log("index.js is loaded");

// DIContainer에서 필요한 객체 가져오기
const modeService = diContainer.get("modeService");
console.log("ModeService:", modeService);

const dataStore = diContainer.get("dataStore");
console.log("DataStore:", dataStore);

// const openSmallPopup = diContainer.get("openSmallPopup");

// const openPopupBtn = document.getElementById("open-popup-btn");
// console.log(openPopupBtn);
// openPopupBtn.addEventListener(
//     "click",
//     openSmallPopup("../search/product/searech-product.html", "small")
// );
