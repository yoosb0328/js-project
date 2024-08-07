class ModeService {
    constructor() {
        this.mode = Object.freeze({
            ADD: "add",
            MODIFY: "modify",
            //추후 필요에 따라 mode 추가 가능.
        });
    }

    getModeFromQuery() {
        //호출한 window창의 url에서 param명 mode의 값을 추출합니다.
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("mode");
    }
}

export default ModeService;
