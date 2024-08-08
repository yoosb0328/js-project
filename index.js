import diContainer from "./common/DIContainer.js";
// DIContainer에서 필요한 객체 가져오기
const modeService = diContainer.get("modeService");
const dataStore = diContainer.get("dataStore");
const logger = diContainer.get("logger");
const dataLoader = diContainer.get("dataLoader");
const popupOpener = diContainer.get("popupOpener");


logger.log("index.js is loaded");
dataLoader.initLocalStorageData();

//이벤트 리스너 부착.
const openPopupBtn = document.getElementById("open-popup-btn");

openPopupBtn.addEventListener("click", () => {
    popupOpener.openPopup("./edit/product/edit-product.html", "small");
});

