import { DataStore } from "../data/DataStore.js";
/*팝업 오픈 시 데이터 전송*/

// 부모 창에서 메시지를 수신하고, 팝업으로 데이터를 전송
window.addEventListener("message", (event) => {
    // 보안 검증
    if (event.origin !== "http://127.0.0.1:5500") {
        console.error("허용되지 않은 출처", event.origin);
        return;
    }
    // if (event.data === "requestCategories") {
    //     const data = DataStore.getInstance().categories;
    //     event.source.postMessage({ type: "categories", data: data }, event.origin);
    // }

    switch (event.data) {
        case "requestCategories": //카테고리 정보를 부모창에서 자식 팝업으로 전송.
            const data = DataStore.getInstance().categories;
            event.source.postMessage({ type: "categories", data: data }, event.origin);
            break;
        case "checkBoxApplyItems":
    }
});
