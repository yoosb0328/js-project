// Mode Enum 정의
const Mode = Object.freeze({
    ADD: "add",
    MODIFY: "modify",
});

// 쿼리 파라미터에서 mode 값을 추출하는 함수
function getModeFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("mode");
}

// 모듈 내보내기
export { Mode, getModeFromQuery };
