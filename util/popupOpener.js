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
                return this.createSearchProductModal();
            default:
                console.warn("지원하지 않는 경로입니다.");
                return null;
        }
    }

    createSearchProductModal() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);

    
        const modal = document.createElement('div');
        modal.className = 'modal-container';
        modal.innerHTML = `
            <div class="modal-header">
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="modal-body">
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
                                            <input id="category-code-txt" class="category-txt" type="text" placeholder="품목코드">
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="table-div">
                                        <span class="name-tag">품목명</span>
                                        <form class="search-box">
                                            <input id="category-name-txt" class="category-name-txt" type="text" placeholder="품목명">
                                        </form>
                                    </div>
                                </td>
                            </tr>
                            <tr style="background-color: white;">
                                <td>
                                    <div class="button-tab search-content" style="margin-top: 5px; margin-bottom: 5px;">
                                        <button id="search-btn" data-type="category" class="color-button">검색</button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="center-buttons" style="margin-top: 10px; margin-bottom: 10px;">
                        <button id="category-prev-button">< 이전 </button>
                        <button id="category-next-button"> 다음 > </button>
                    </div>
                    <div class="main" style="margin-bottom: 10px;">
                        <table class="main-table">
                            <colgroup>
                                <col style="width: 5px;">
                                <col style="width: auto;">
                                <col style="width: auto;">
                                <col style="width: 40px;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" id="check-all"></th>
                                    <th>품목코드</th>
                                    <th>품목명</th>
                                    <th>수정</th>
                                </tr>
                            </thead>
                            <tbody id="common-tbody">
                                <!-- 데이터가 여기에 삽입됩니다. -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="bottom-buttons">
                        <button id="apply-btn" data-type="category" class="apply-btn non-color-button"> 적용 </button>
                        <button id="open-popup-btn" class="new-category-btn color-button"> 신규 </button>
                        <button id="close-popup-btn" class="non-color-button"> 닫기 </button>
                    </div>
                </div>
            </div>
        `;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/modal.css'; // 경로가 올바른지 확인하세요.
        document.head.appendChild(link);
        
        // Add event listeners
        this.addEventListeners(modal, overlay);

        return modal;
    }

    addEventListeners(modal, overlay) {
        // Close button
        const closeButton = modal.querySelector('.modal-close-btn');
        closeButton.addEventListener('click', () => this.closeModal(modal, overlay));

        // Apply button
        const applyButton = modal.querySelector('#apply-btn');
        applyButton.addEventListener('click', () => this.closeModal(modal, overlay));

        // Open Popup button
        const openPopupButton = modal.querySelector('#open-popup-btn');
        openPopupButton.addEventListener('click', () => this.openPopup('url_to_open', 'small'));

        // Close button
        const closePopupButton = modal.querySelector('#close-popup-btn');
        closePopupButton.addEventListener('click', () => this.closeModal(modal, overlay));

        // Overlay click
        overlay.addEventListener('click', () => this.closeModal(modal, overlay));
    }

    closeModal(modal, overlay) {
        if (modal) {
            document.body.removeChild(modal);
        }
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }
}

export default PopupOpener;
