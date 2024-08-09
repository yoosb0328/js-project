class IndexController {
    constructor(logger, dataLoader, popupOpener) {
        logger.log("IndexController constructor");
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
        dataLoader.fetchProductData();
        this.setEventListner();
    }

    //이벤트 리스너 부착.
    setEventListner() {
        const openPopupBtn = document.getElementById("open-popup-btn");
        openPopupBtn.addEventListener("click", () => {
            this.popupOpener.openPopup("./edit/product/edit-product.html", "small");
        });
    }
}

export default IndexController;
