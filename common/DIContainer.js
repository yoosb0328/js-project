import ModeService from "../util/ModeService.js";
import DataStore from "../data/DataStore.js";
import PopupOpener from "../util/popupOpener.js";
import Logger from "../util/ConsoleLogger.js";
import DataLoader from "../data/DataLoader.js";
import IndexController from "../IndexController.js";
import SearchSaleController from "../search/sale/controller/SearchSaleController.js";
import SearchProductController from "../search/product/controller/SearchProductController.js";
class DIContainer {
    constructor() {
        console.log("DIContainer constructor");
        if (!DIContainer.instance) {
            this.beans = new Map();
            DIContainer.instance = this;
            /*
                현재 환경에서는 Browser 초기화, 페이지 이동시마다 메모리 초기화 되어 모든 bean 새로 생성되지만
                웹서버 구현 시에는 그렇지 않으므로 한번에 모두 등록해놓고 사용하는 방식이 효율적일듯
            */
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
            ); //시작화면 컨트롤러
            this.register(
                "searchSaleController",
                new SearchSaleController(
                    this.beans.get("logger"),
                    this.beans.get("dataLoader"),
                    this.beans.get("popupOpener")
                )
            ); //판매조회 컨트롤러
            this.register(
                "SearchProductController",
                new SearchProductController(
                    this.beans.get("logger"),
                    this.beans.get("dataLoader"),
                    this.beans.get()
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
