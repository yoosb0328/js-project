class PopupOpener {
    openPopup(url, size) {
        switch (size) {
            case "small":
                window.open(url, "small-popup", "width=600,height=300");
                break;
            case "large":
                window.open(url, "large-popup", "width=600,height=600");
                break;
            default:
                break;
        }
    }

    setModal(path) {
        switch (path) {
            case "/search/product":
                return this.createSearchProductModal(); //품목조회 모달
            case "/add/product":
                return this.createAddProductModal(); //품목등록 모달
            case "/add/Sale":
                return this.createAddSaleModal(); //신규판매 모달
            default:
                console.warn("지원하지 않는 경로입니다.");
                return null;
        }
    }

    createSearchProductModal() {
        const modalHTML = `
            <div class="title">
                <h3 style="margin-left: 10px;"> &#x25A0; 품목조회</h3>
            </div>
            <div class="content">
                <div class="search-tab">
                    <table class="search-table">
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">품목코드</span>
                                    <form class="search-box">
                                        <input id="product-code-txt" class="product-txt" type="text" placeholder="품목코드">
                                    </form>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">품목명</span>
                                    <form class="search-box">
                                        <input id="product-name-txt" class="product-name-txt" type="text" placeholder="품목명">
                                    </form>
                                </div>
                            </td>
                        </tr>
                        <tr style="background-color: white;">
                            <td>
                                <div class="button-tab search-content" style="margin-top: 5px; margin-bottom: 5px;">
                                    <button id="search-btn" data-type="product" class="color-button">검색</button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="center-buttons" style="margin-top: 10px; margin-bottom: 10px;">
                    <button id="product-prev-button">< 이전 </button> 
                    <button id="product-next-button"> 다음 > </button>
                </div>
                <div class="main" style="margin-bottom: 10px;">
                    <table class="main-table">
                        <colgroup>
                            <col style="width: 5px;">
                            <col style="width: auto">
                            <col style="width: auto">
                            <col style="width: auto">

                            <col style="width: 40px">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="product-check-all">
                                </th>
                                <th>품목코드</th>
                                <th>품목명</th>
                                <th>단가</th>
                                <th>수정</th>
                            </tr>
                        </thead>
                        <tbody id="product-tbody">
                            
                        </tbody>
                    </table>
                </div>
                <div class="bottom-buttons">
                    <button id="apply-btn" data-type="product" class="apply-btn non-color-button">적용</button> 
                    <button id="new-product-btn" class="new-product-btn color-button">신규</button>
                    <button id="close-popup-btn" class="non-color-button">닫기</button>
                </div>
            </div>
        `;

        return modalHTML;
    }

    createAddProductModal() {
        const modalHTML = `
            <div class="title">
                <h3 style="margin-left: 10px;"> &#x25A0; 품목등록</h3>
            </div>
            <div class="content">
                <div class="search-tab">
                    <table class="search-table">
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">품목코드</span>
                                    <form class="search-box">
                                        <input id="prodCode" class="category-txt" type="text" placeholder="품목코드">
                                    </form>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">품목명</span>
                                    <form class="search-box">
                                        <input id="prodName" class="category-name-txt" type="text" placeholder="품목명">
                                    </form>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="table-div">
                                    <span class="name-tag">단가</span>
                                    <form class="search-box">
                                        <input id="price" class="category-price-txt" type="text" placeholder="단가">
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="bottom-buttons">
                    <button id="save-btn" data-type="category" class="color-button"> 저장 </button> 
                    <button id="rewrite-btn" data-type="category" class="non-color-button"> 다시작성 </button>
                    <button id="close-popup-btn" class="non-color-button"> 닫기 </button>
                </div>
            </div>
        `;

        return modalHTML;
    }
    // addEventListeners(modal, overlay) {
    //     // Close button
    //     const closeButton = modal.querySelector(".modal-close-btn");
    //     closeButton.addEventListener("click", () => this.closeModal(modal, overlay));

    //     // Apply button
    //     const applyButton = modal.querySelector("#apply-btn");
    //     applyButton.addEventListener("click", () => this.closeModal(modal, overlay));

    //     // Open Popup button
    //     const openPopupButton = modal.querySelector("#open-popup-btn");
    //     openPopupButton.addEventListener("click", () => this.openPopup("url_to_open", "small"));

    //     // Close button
    //     const closePopupButton = modal.querySelector("#close-popup-btn");
    //     closePopupButton.addEventListener("click", () => this.closeModal(modal, overlay));

    //     // Overlay click
    //     overlay.addEventListener("click", () => this.closeModal(modal, overlay));
    // }

    // closeModal(modal, overlay) {
    //     if (modal) {
    //         document.body.removeChild(modal);
    //     }
    //     if (overlay) {
    //         document.body.removeChild(overlay);
    //     }
    // }
}

export default PopupOpener;
