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
            }
            const nameInput = document.querySelector(".category-name-txt");
            console.log(nameInput);
            if (nameInput) {
                nameInput.value = name;
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
