class SearchSaleController {
    constructor(logger, dataLoader, popupOpener) {
        logger.log("SearchSaleController constructor");
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }
    //sale 데이터 반환
    getAllSales() {
        return this.dataLoader.getSales();
    }
    //페이징 데이터 반환
    salePaging(currentPage, itemsPerPage) {
        try {
            const startIndex = (currentPage - 1) * itemsPerPage; //처음에는 0에서 시작.
            const endIndex = startIndex + itemsPerPage; //처음에는 10
            const data = this.dataLoader.getSales().slice(startIndex, endIndex);
            return data;
        } catch (error) {
            this.logger.err(error);
        }
    }
    
} //class SearchSaleController

export default SearchSaleController;
