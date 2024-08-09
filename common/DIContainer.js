import ModeService from "../util/ModeService.js";
import DataStore from "../data/DataStore.js";
import PopupOpener from "../util/popupOpener.js";
import Logger from "../util/ConsoleLogger.js";
import DataLoader from "../data/DataLoader.js";
import IndexController from "../IndexController.js";
class DIContainer {
    constructor() {
        console.log("DIContainer constructor");
        if (!DIContainer.instance) {
            this.beans = new Map();
            DIContainer.instance = this;

            // Bean 등록
            this.register("logger", new Logger(true)); //console.log on off 설정
            this.register("modeService", new ModeService()); //mode enum class
            this.register("dataStore", DataStore.getInstance()); //메모리 데이터 저장소
            this.register("popupOpener", new PopupOpener()); // 팝업 처리 클래스
            this.register(
                "dataLoader",
                new DataLoader(this.beans.get("logger"), this.beans.get("dataStore"))
            ); //초기 데이터 생성 클래스
            this.register(
                "indexController",
                new IndexController(
                    this.beans.get("logger"),
                    this.beans.get("dataLoader"),
                    this.beans.get("popupOpener")
                )
            );
        }

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
