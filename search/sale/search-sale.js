import diContainer from "../../common/DIContainer";

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
});

const controller = diContainer.get("searchSaleController");
controller.init();
