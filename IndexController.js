class IndexController {
    constructor(logger, dataLoader, popupOpener) {
        logger.log("IndexController constructor");
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
        
    }

    loadData() {
        this.logger.log("IndexController : loadData");
        if (!localStorage.getItem("products") && !localStorage.getItem("sales"))
            this.dataLoader.initLocalStorageData();
        this.dataLoader.loadFromLocalStorage();
    }

    getProduct() {
        return this.dataLoader.getProducts();
    }
}

export default IndexController;
