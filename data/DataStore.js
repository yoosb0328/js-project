class DataStore {
    /* 
        DataStore는 데이터를 저장하는 역할만 할 것.
    */
    constructor() {
        console.log("DataStore constructor");
        // DataStore 인스턴스가 있는 경우 그대로 반환 (싱글톤 목적)
        if (DataStore.instance) {
            return DataStore.instance;
        }

        // 현재단계에서는 LocalStorage와 일치하게 JSON 형식으로 저장.
        // 추후 DB 사용 시 Class로 구현.
        this.products = new Map(); // key : 품목코드
        this.sales = new Map(); // key : 판매일자 + 번호

        //싱글톤 객체 사용
        DataStore.instance = this;
    }

    // 인스턴스 호출
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
}

export default DataStore;
