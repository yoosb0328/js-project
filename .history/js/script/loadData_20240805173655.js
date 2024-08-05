import { CategoryRender } from "../data/Category.js";

// 페이지 로드 시 데이터 요청
window.addEventListener("load", requestData);

// 부모 창에 데이터 요청을 보냄
function requestData() {
    window.opener.postMessage("requestCategories", "*");
}

// 부모 창에서 보낸 메시지를 수신하여 렌더링
window.addEventListener("message", (event) => {
    // 보안 검증
    if (event.origin !== "http://127.0.0.1:5500") {
        console.error("허용되지 않은 출처", event.origin);
        return;
    }

    if (event.data.type === "categories") {
        const categories = event.data.data;
        alert(categories.length);
        const categoryRender = new CategoryRender(categories);
        categoryRender.render();
    }
});
