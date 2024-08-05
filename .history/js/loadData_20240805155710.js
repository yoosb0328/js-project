// 메시지 이벤트 리스너 추가
window.addEventListener("message", (event) => {
    // event.origin을 검증하여 보안성을 강화
    if (event.origin !== "http://127.0.0.1:5500") {
        console.error("허용되지 않은 출처", event.origin);
        return;
    }
    // event.data를 확인하여 메시지 처리

    if (event.data.type === "categories") {
        console.log("Received message from parent:", message);
    } else {
        console.log("Unknown message type:", type);
    }
});
