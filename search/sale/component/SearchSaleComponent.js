export default class SearchSaleComponent {
    constructor(controller, popupOpener) {
        this.controller = controller;
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.popupOpener = popupOpener;
    }
    init() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../../css/search-sale.css';
        document.head.appendChild(link);

        this.renderSearchTab();
        this.renderTable();
        this.initEventListner();
    }
    renderSearchTab() {
        
        const view = document.getElementById("app");
        //검색탭
        view.innerHTML = `
            <div class="title">
                <h3 style="margin-left: 10px;"> &#x25A0; 판매조회</h3>
            </div>
            <div class="content">
                <div class="search-tab">
                    <table class="search-table">
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">전표일자</span>
                                    <div class="search-box">
                                        <select id="year-select-from">
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                        </select>
                                        /
                                        <select id="month-select-from">
                                            <option value="12">12</option>
                                            <option value="11">11</option>
                                            <option value="10">10</option>
                                            <option value="9">9</option>
                                            <option value="8">8</option>
                                            <option value="7">7</option>
                                            <option value="6">6</option>
                                            <option value="5">5</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                            <option value="1">1</option>
                                        </select>
                                        /
                                        <input id="date-input-from" class="date-input" type="number" placeholder="일자" value="31" max="31">
                                        ~
                                        <select id="year-select-to">
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                        </select>
                                        /
                                        <select id="month-select-to">
                                            <option value="12">12</option>
                                            <option value="11">11</option>
                                            <option value="10">10</option>
                                            <option value="9">9</option>
                                            <option value="8">8</option>
                                            <option value="7">7</option>
                                            <option value="6">6</option>
                                            <option value="5">5</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                            <option value="1">1</option>
                                        </select>
                                        /
                                        <input id="date-input-to" class="date-input" type="number" placeholder="일자" value="31" max="31">
                                    </div>
                                </div>
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">품목</span>
                                    <form class="search-box">
                                        <button id="open-popup-btn" class="category-btn">찾기</button>
                                        <input id="category-search-input" class="category-txt" type="text" readonly placeholder="품목">
                                    </form>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">적요</span>
                                    <div class="search-box">
                                        <input class="memo-txt" type="text" placeholder="적요">           
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr style="background-color: white;">
                            <td>
                                <div class="button-tab search-content" style="margin-top: 5px; margin-bottom: 5px;">
                                    <button id="search-btn"
                                            data-type="sale" 
                                            class="color-button">검색</button></div>
                            </td>
                        </tr>
                    </table>
                </div>
        `;
        
        //테이블
        view.innerHTML += `
        <div class="center-buttons" style="margin-top: 10px; margin-bottom: 10px;">
            <button id="sales-prev-button">< 이전 </button> <button id="sales-next-button"> 다음 >  </button>
        </div>
        <div class="main" style="margin-bottom: 10px;">
            <table id="sales-table" class="main-table">
                <colgroup id="sales-colgroup">
                    <col style="width: 5px;">
                    <col style="width: auto;">
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                </colgroup>
                <thead id="sales-thead">
                    <tr>
                        <th>
                            <input type="checkbox" id="check-all">
                        </th>
                        <th>
                            전표일자/번호
                        </th>
                        <th>
                            품목코드
                        </th>
                        <th>
                            품목명
                        </th>
                        <th>
                            수량
                        </th>
                        <th>
                            단가
                        </th>
                        <th>
                            적요
                        </th>
                    </tr>
                </thead>
                <tbody id="common-tbody" class="table-body">
                </tbody>
            </table>
        </div>
        <div class="bottom-buttons">
            <button id="new-sale-btn" class="new-sale-btn color-button"> 신규 </button> <button class="non-color-button"> 선택삭제 </button>
        </div>`;
    }//render()

    renderTable() {

        const currentSales = this.controller.salePaging(this.currentPage, this.itemsPerPage);
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
                    <a href="#"ß
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
        this.updateButtons();

    } //renderTable()

    renderModal() {
        const modal = this.popupOpener.setModal("/search/product");
        if (modal) {
            document.body.appendChild(modal.innerHTML);
        }
    }


    //페이징 버튼 처리.
    updateButtons() {
        const prevButton = document.querySelector("#sales-prev-button");
        const nextButton = document.querySelector("#sales-next-button");
        prevButton.addEventListener("click", () => this.goToPrevPage());
        nextButton.addEventListener("click", () => this.goToNextPage());
        const sales = this.controller.getAllSales();
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
        const sales = this.controller.getAllSales();
        if (this.currentPage < Math.ceil(sales.length / this.itemsPerPage)) {
            this.setPage(this.currentPage + 1);
        }
    }

    //찾기 버튼
    initEventListner() {
        const openPopupBtn = document.getElementById("open-popup-btn");
        openPopupBtn.addEventListener("click", () => this.renderModal());
    }
}//class SearchSaleComponent