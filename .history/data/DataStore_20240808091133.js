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

        // map : code : [name, price]
        // sales = code : [date, num, qty, price, remarks]
        this.map = new Map(); // 품목 코드 - 이름으로 저장
        this.sales = []; // 판매 목록은 검색 시 품목코드

        // 메모리 관리를 위해 인스턴스를 싱글톤으로 설정
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
