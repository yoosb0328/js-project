// import { DataStore } from "./data/DataStore.js";

// const dataStore = DataStore.getInstance();

// if (dataStore.categories.length === 0 && dataStore.sales.length === 0) {
//     dataStore.loadFromLocalStorage();
// }

// 메시지 이벤트 리스너 추가
window.addEventListener("message", (event) => {
    // event.origin을 검증하여 보안성을 강화
    if (event.origin !== "http://your-expected-origin.com") {
        console.error("Message received from untrusted origin:", event.origin);
        return; // 원하지 않는 출처의 메시지는 무시합니다.
    }

    // event.data를 확인하여 메시지 처리
    const { type, message } = event.data;

    if (type === "greeting") {
        console.log("Received message from parent:", message);
    } else {
        console.log("Unknown message type:", type);
    }
});
