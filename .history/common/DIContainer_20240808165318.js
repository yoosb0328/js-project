import ModeService from "../util/ModeService.js";
import DataStore from "../data/DataStore.js";
import { openSmallPopup, openLargePopup } from "../util/popupOpener.js";
class DIContainer {
    constructor() {
        console.log("DIContainer constructor");
        if (!DIContainer.instance) {
            this.beans = new Map();
            DIContainer.instance = this;
        }

        // Bean 등록
        this.register("modeService", new ModeService()); // mode enum class
        this.register("dataStore", DataStore.getInstance()); // memory data store
        this.register("openSmallPopup", openSmallPopup); // popup open function
        this.register("openLargePopup", openLargePopup); // popup open function

        return DIContainer.instance;
    }

    register(key, instance) {
        this.beans.set(key, instance);
    }

    get(key) {
        if (!this.beans.has(key)) {
            throw new Error(`${key}는 DI Container에 등록되지 않았습니다.`);
        }
        return this.beans.get(key);
    }
}
const diContainer = new DIContainer();
export default DIContainer;
