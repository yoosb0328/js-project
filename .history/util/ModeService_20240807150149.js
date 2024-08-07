class ModeService {
    constructor() {
        this.Mode = Object.freeze({
            ADD: "add",
            MODIFY: "modify",
        });
    }

    getModeFromQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("mode");
    }
}

export default ModeService;
