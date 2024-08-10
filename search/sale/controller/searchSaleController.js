class SearchSaleController {
    constructor(logger, dataLoader, popupOpener) {
        logger.log("SearchSaleController constructor");
        this.logger = logger;
        this.dataLoader = dataLoader;
        this.popupOpener = popupOpener;
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sales = this.dataLoader.getSales();
    }

    init() {
        this.setEventListner();
        this.renderTable();
    }
    //이벤트 리스너 부착.
    setEventListner() {
        try {
            //찾기 버튼
            const openPopupBtn = document.getElementById("open-popup-btn");
            if (openPopupBtn) {
                openPopupBtn.addEventListener("click", () => {
                    this.popupOpener.openPopup("../product/search-product.html", "large");
                });
            }

            //이전 다음 버튼
            const prevButton = document.querySelector("#sales-prev-button");
            const nextButton = document.querySelector("#sales-next-button");
            if (prevButton) prevButton.addEventListener("click", this.goToPrevPage.bind(this));
            if (nextButton) nextButton.addEventListener("click", this.goToNextPage.bind(this));
        } catch (error) {
            this.logger.err(error);
        }
    } //setEventListner()

    //렌더링
    renderTable() {
        try {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage; //처음에는 0에서 시작.
            const endIndex = startIndex + this.itemsPerPage; //처음에는 10
            const currentSales = this.sales.slice(startIndex, endIndex); //0~9까지 slice하게 됨.

            const tbody = document.getElementById("common-tbody");
            tbody.innerHTML = "";
            currentSales.forEach((data) => {
                const pk = data[0];
                const sale = data[1];
                const date = sale["date"];
                const code = sale["code"];
                const name = sale["name"];
                const qty = sale["qty"];
                const price = sale["price"];
                const remark = sale["remark"];
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="center-align-cell"><input class="row-checkbox" type="checkbox"></td>
                    <td class="left-align-cell">
                        <a href="#"
                            class="edit-link"
                            data-pk="${pk}"
                            data-date="${date}"
                            data-category-code="${code}"
                            data-category-name="${name}"
                            data-qty="${qty}"
                            data-price="${price}"
                            data-remark="${remark}">
                            ${pk}
                        </a>
                    </td>
                    <td class="left-align-cell">${code}</td>
                    <td class="left-align-cell">${name}</td>
                    <td class="right-align-cell">${qty}</td>
                    <td class="right-align-cell">${price}</td>
                    <td class="left-align-cell">${remark}</td>
                `;
                tbody.appendChild(row);
            }); //forEach

            // 버튼 활성화 상태 업데이트
            this.updateButtons();
        } catch (error) {
            this.logger.err(error);
        }
    } //renderTable()

    //페이징 처리
    updateButtons() {
        try {
            const prevButton = document.querySelector("#sales-prev-button");
            const nextButton = document.querySelector("#sales-next-button");

            prevButton.disabled = this.currentPage === 1;
            nextButton.disabled =
                this.currentPage === Math.ceil(this.sales.length / this.itemsPerPage);
        } catch (error) {
            this.logger.err(error);
        }
    } //updateButtons()

    setPage(page) {
        try {
            this.currentPage = page;
            this.renderTable();
        } catch (error) {
            this.logger.err(error);
        }
    }

    goToPrevPage() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    goToNextPage() {
        if (this.currentPage < Math.ceil(this.sales.length / this.itemsPerPage)) {
            this.setPage(this.currentPage + 1);
        }
    }
} //class SearchSaleController

export default SearchSaleController;
