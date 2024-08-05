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

        if (prevButton) prevButton.addEventListener("click", this.goToPrevPage.bind(this));
        if (nextButton) nextButton.addEventListener("click", this.goToNextPage.bind(this));
    }

    render() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage; //처음에는 0에서 시작.
        const endIndex = startIndex + this.itemsPerPage; //처음에는 10
        const currentCategories = this.categories.slice(startIndex, endIndex); //0~9까지 slice하게 됨.
        const tbody = document.getElementById("common-tbody");

        if (tbody) tbody.innerHTML = "";

        currentCategories.forEach((category) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="center-align-cell"><input class="row-checkbox" type="checkbox"></td>
                <td class="center-align-cell category-code">${category.code}</td>
                <td class="left-align-cell category-name">${category.name}</td>
                <td class="left-align-cell"><a href="category-input-popup.html?code=${encodeURIComponent(
                    category.code
                )}&name=${encodeURIComponent(category.name)}&type=categoryModify">수정</a></td>
            `;
            tbody.appendChild(row);
        });

        // 버튼 활성화 상태 업데이트
        this.updateButtons();
    } //render()

    updateButtons() {
        const prevButton = document.querySelector("#category-prev-button");
        const nextButton = document.querySelector("#category-next-button");

        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled =
            this.currentPage === Math.ceil(this.categories.length / this.itemsPerPage);
    } //updateButtons()

    setPage(page) {
        this.currentPage = page;
        this.render();
    } //setPage()

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
} //CategoryRender()

export function renderAppliedCategory(categories) {
    // 렌더링할 input 태그 선택
    const categoryInput = document.getElementById("category-search-input");
    categoryInput.value = "";
    // 배열의 요소를 문자열로 변환
    const categoryCodes = categories.map((category) => category.code).join(", ");

    // input 태그에 문자열 설정
    if (categoryInput) {
        categoryInput.value = categoryCodes;
    }
} // renderAppliedCategory
