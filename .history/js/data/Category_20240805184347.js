export class Category {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    //Getter
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
}

export class CategoryRender {
    constructor(categories) {
        this.categories = categories;
        this.currentPage = 1;
        this.itemsPerPage = 10;

        this.initEventListeners();
    }

    initEventListeners() {
        const prevButton = document.querySelector("#category-prev-button");
        const nextButton = document.querySelector("#category-next-button");

        prevButton.addEventListener("click", this.goToPrevPage.bind(this));
        nextButton.addEventListener("click", this.goToNextPage.bind(this));
    }

    render() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage; //처음에는 0에서 시작.
        const endIndex = startIndex + this.itemsPerPage; //처음에는 10
        const currentCategories = this.categories.slice(startIndex, endIndex); //0~9까지 slice하게 됨.
        const tbody = document.getElementById("common-tbody");

        tbody.innerHTML = "";

        currentCategories.forEach((category) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="center-align-cell"><input class="row-checkbox" type="checkbox"></td>
                <td class="center-align-cell category-code">${category.code}</td>
                <td class="left-align-cell category-name">${category.name}</td>
                <td class="left-align-cell">수정</td>
            `;
            tbody.appendChild(row);
        });

        // 버튼 활성화 상태 업데이트
        this.updateButtons();
    }
    //품목 조회를 통해 적용한 품목들을 검색창에 그리기
    renderAppliedCategories() {}
    updateButtons() {
        const prevButton = document.querySelector("#category-prev-button");
        const nextButton = document.querySelector("#category-next-button");

        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled =
            this.currentPage === Math.ceil(this.categories.length / this.itemsPerPage);
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }

    goToPrevPage() {
        if (this.currentPage > 1) {
            this.setPage(this.currentPage - 1);
        }
    }

    goToNextPage() {
        if (this.currentPage < Math.ceil(this.categories.length / this.itemsPerPage)) {
            this.setPage(this.currentPage + 1);
        }
    }
}
