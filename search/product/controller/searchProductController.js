class SearchProductController {
    constructor(logger, dataLoader, popupOpener) {
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
    }

    //product 데이터 반환
    getAllProducts() {
        return this.dataLoader.getProducts();
    }
    //페이징 데이터 반환
    productPaging(currentPage, itemsPerPage) {
        try {
            const startIndex = (currentPage - 1) * itemsPerPage; //처음에는 0에서 시작.
            const endIndex = startIndex + itemsPerPage; //처음에는 10
            const data = this.dataLoader.getProducts().slice(startIndex, endIndex);
            return data;
        } catch (error) {
            this.logger.err(error);
        }
    }
} //class SearchProductController

export default SearchProductController;
