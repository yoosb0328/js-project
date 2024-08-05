getQueryParams();

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    switch (type) {
        case "categoryModify":
            const code = params.get("code");
            const name = params.get("name");
            console.log(code, name);
            const codeInput = document.querySelector(".category-txt");
            if (codeInput) {
                codeInput.readOnly = true;
                codeInput.value = code;
                codeInput.setAttribute("data-mode", "modify");
            }
            const nameInput = document.querySelector(".category-name-txt");
            console.log(nameInput);
            if (nameInput) {
                nameInput.value = name;
            }
            break;
        case "saleModify":
            const dateNumber = params.get("dateNumber");
            const [year, month, day] = dateNumber.split("-"); // dateNumber를 파싱
            const monthWithoutZero = parseInt(month, 10); // 문자열을 숫자로 변환하여 앞의 0 제거
            const categoryCode = params.get("categoryCode");
            const categoryName = params.get("categoryName");
            const quantity = params.get("quantity");
            const price = params.get("price");
            const description = params.get("description");

            const dateNumberHidden = document.getElementById("date-num-hidden");
            if (dateNumberHidden) {
                dateNumberHidden.value = dateNumber;
            }

            const yearSelect = document.getElementById("year-select");
            if (yearSelect) {
                yearSelect.value = year;
            }
            const monthSelect = document.getElementById("month-select");
            alert(month);
            if (monthSelect) {
                monthSelect.value = monthWithoutZero;
            }
            const dateInput = document.querySelector(".date-input");
            if (dateInput) {
                dateInput.readOnly = true;
                dateInput.value = day;
                dateInput.setAttribute("data-mode", "modify");
            }
            const categoryCodeInput = document.querySelector(".category-search-input");
            if (categoryCodeInput) {
                categoryCodeInput.readOnly = true;
                categoryCodeInput.value = categoryCode;
            }

            const quantityInput = document.querySelector(".quantity");
            if (quantityInput) {
                quantityInput.value = quantity;
            }
            const priceInput = document.querySelector(".price");
            if (priceInput) {
                priceInput.value = price;
            }
            const descriptionInput = document.querySelector(".description");
            if (descriptionInput) {
                descriptionInput.value = description;
            }
            break;
        default:
            break;
    }

    // return {
    //     code: params.get("code"),
    //     name: params.get("name"),
    //     // 기타 데이터 추출
    // };
}
