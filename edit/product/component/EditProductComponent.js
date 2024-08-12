export default class EditProductComponent {
    constructor(logger, controller) {
        this.logger = logger;
        this.controller = controller;
    }

    //신규 등록 모드
    init() {
        this.logger.log("SearchProductComponent add mode init()");
        this.renderTable();
        this.initEventListner();
    }
    //수정 모드
    init(params) {
        this.logger.log("SearchProductComponent modify mode init()");
    }

    //이벤트리스너 부착
    initEventListner() {}
} //class SearchProductComponent
