import { routePopup } from "../../../router.js";

export default class SearchProductComponent {
    constructor(logger, controller, popupOpener) {
        this.logger = logger;
        this.controller = controller;
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.popupOpener = popupOpener;
    }
    init() {
        this.logger.log("SearchProductComponent init()");
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../../css/search-product.css";
        document.head.appendChild(link);
        this.renderTable();
        this.initEventListner();
    }

    openModal() {
        this.logger.log("SearchProductComponent openModal()");

        const modalHTML = this.popupOpener.setModal("/add/product");
        // Get the modal
        const modal = document.getElementById("myModal");
        document.getElementById("modal-body").innerHTML = modalHTML;
        modal.style.display = "block";
        const closeButton = document.getElementById("close-popup-btn");
        closeButton.onclick = function () {
            modal.style.display = "none";
        };

        routePopup("/add/product");
    }

    renderTable() {
        const currentProducts = this.controller.productPaging(this.currentPage, this.itemsPerPage);
        const tbody = document.getElementById("product-tbody");
        tbody.innerHTML = "";
        currentProducts.forEach((data) => {
            const code = data[0];
            const temp = data[1];
            const prodName = temp["prodName"];
            const price = temp["price"];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="center-align-cell"><input class="row-checkbox" type="checkbox"></td>
                <td class="center-align-cell category-code">${code}</td>
                <td class="left-align-cell category-name">${prodName}</td>
                <td class="center-align-cell category-code">${price}</td>
                <td class="center-align-cell">
                    <a href="#" data-product-code=${code}' data-product-name=${prodName} return false;">
                    수정
                    </a>
                </td>
            `;
            tbody.appendChild(row);
        }); //forEach
        this.updateButtons();

        this.logger.log("SearchProductComponent renderTable()");
    } //renderTable()

    //페이징 버튼 처리.
    updateButtons() {
        const prevButton = document.querySelector("#product-prev-button");
        const nextButton = document.querySelector("#product-next-button");
        prevButton.addEventListener("click", () => this.goToPrevPage());
        nextButton.addEventListener("click", () => this.goToNextPage());
        const sales = this.controller.getAllProducts();
        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled = this.currentPage === Math.ceil(sales.length / this.itemsPerPage);
    } //updateButtons()

    setPage(page) {
        this.currentPage = page;
        this.renderTable();
    }

    goToPrevPage() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    goToNextPage() {
        const sales = this.controller.getAllProducts();
        if (this.currentPage < Math.ceil(sales.length / this.itemsPerPage)) {
            this.setPage(this.currentPage + 1);
        }
    }

    //이벤트리스너 부착
    initEventListner() {
        //체크박스
        const checkAll = document.getElementById("product-check-all");
        checkAll.addEventListener("change", (event) => {
            const isChecked = event.target.checked;
            const rowCheckboxes = document.querySelectorAll("#product-tbody .row-checkbox");
            rowCheckboxes.forEach((checkbox) => {
                checkbox.checked = isChecked;
            });
        });

        //신규 버튼
        const newProductBtn = document.getElementById("new-product-btn");
        newProductBtn.addEventListener("click", (event) => {
            event.preventDefault(); // 폼 제출 방지 (button이 form 내에 있을 때)
            this.openModal();
        });

        //닫기 버튼
        const closeButton = document.getElementById("close-popup-btn");
        const modal = document.getElementById("myModal");
        closeButton.onclick = function () {
            modal.style.display = "none";
        };
        this.setPage(1);
    }
} //class SearchProductComponent
