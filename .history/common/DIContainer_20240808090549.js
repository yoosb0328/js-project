import ModeService from "../util/ModeService.js";
import DataStore from "../data/DataStore.js";
import { openLargePopup, openSmallPopup } from "../util/popupOpener.js";
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
        this.register("openSmallPopup");
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

// 싱글톤 인스턴스 생성
const diContainer = new DIContainer();
export default diContainer;
