class IndexController {
    constructor(logger, dataLoader, popupOpener) {
        logger.log("IndexController constructor");
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
        if (!localStorage.getItem("products") && !localStorage.getItem("sales"))
            dataLoader.initLocalStorageData();
        dataLoader.loadFromLocalStorage();
    }
}

export default IndexController;
