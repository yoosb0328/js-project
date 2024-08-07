class ModeService {
    constructor() {
        this.mode = Object.freeze({
            ADD: "add",
            MODIFY: "modify",
            //필요에 따라 mode 추가.
        });
    }

    getModeFromQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("mode");
    }
}

export default ModeService;
