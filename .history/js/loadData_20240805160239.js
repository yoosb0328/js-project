import { CategoryRender } from "./data/Category.js";

// 메시지 이벤트 리스너 추가
window.addEventListener("message", (event) => {
    alert("message");
    // event.origin을 검증하여 보안성을 강화
    if (event.origin !== "http://127.0.0.1:5500") {
        console.error("허용되지 않은 출처", event.origin);
        alert("허용되지 않은 출처");
        return;
    }
    // event.data를 확인하여 메시지 처리
    alert(event.data);
    if (event.data.type === "categories") {
        console.log("Received message from parent:", message);
        alert(event.data.categories);
        const categoryRender = new CategoryRender(event.data.categories);
        categoryRender.render();
    } else {
        console.log("Unknown message type:", type);
    }
});
