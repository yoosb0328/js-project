import { CategoryRender } from "../data/Category.js";
import { DataStore } from "../data/DataStore.js";
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
        //카테고리 데이터 전송.
        const categories = event.data.data;
        //팝업에서 팝업을 호출하는 경우가 있으므로 메모리에 저장 필요
        DataStore.getInstance().categories = categories;
        const categoryRender = new CategoryRender(categories);
        categoryRender.render();
    }
});
