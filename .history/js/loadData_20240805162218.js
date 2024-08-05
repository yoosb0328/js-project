import { CategoryRender } from "./data/Category.js";

// // 메시지 이벤트 리스너 추가
// window.addEventListener("message", (event) => {
//     console.log(event.data.data);
//     // event.origin을 검증하여 보안성을 강화
//     if (event.origin !== "http://127.0.0.1:5500") {
//         console.error("허용되지 않은 출처", event.origin);
//         alert("허용되지 않은 출처");
//         return;
//     }
//     if (event.data.type === "categories") {
//         const categoryRender = new CategoryRender(event.data.data);
//         categoryRender.render();
//     } else {
//         console.log("Unknown message type:", type);
//     }
// });
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
        const categoryRender = new CategoryRender(categories);
        categoryRender.render();
    }
});
