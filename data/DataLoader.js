import diContainer from "../common/DIContainer.js";
import Product from "../entity/Product.js";

class DataLoader {
    
    constructor(){
        this.logger = diContainer.get("logger");
    }
    initLocalStorageData() {
        //local Storage에 dummy data 생성
        const products = localStorage.getItem("products"); 
        const sales = localStorage.getItem("sales");
        // const logger = diContainer.get("logger");
        const dates = ["2024-08-04", "2024-08-03", "2024-08-03", "2024-08-02", "2024-08-01", "2024-07-31"];
        const names = [
            "진라면",
            "신라면",
            "안성탕면",
            "짜파게티",
            "불닭볶음면",
            "팔도비빔면",
            "코카콜라",
            "스프라이트",
            "새우깡",
            "칙촉",
            "수박바",
            "메로나",
            "바밤바",
        ];
        const remarks = ["온라인에서 구매함", "직접 마트 방문해서 구매", "특별이벤트로 할인", ""];
        const dataStore = diContainer.get("dataStore");

        if (!products && !sales) {
            logger.log("init local storage data");
            const codes = [];
            const productMap = new Map();
            //품목 정보 입력
            names.forEach((name, index) => {
                const code = index <= 5 ? "P10000" + index : "P20000" + index;
                const productMap = dataStore.products;
                productMap.set(code, name);
                logger.log(productMap);
                const MapArray = Array.from(productMap.entries());
                localStorage.setItem("products", JSON.stringify(MapArray));
            });

            // dates.forEach((date) => {
            //     for(let i=5; i>=1; i--) {
            //         const code = codes[Math.floor(Math.random() * codes.length)]
            //         const name = products.get(code);
            //         const pk = date+"-"+i;
            //         const remark = remarks[Math.floor(Math.random() * remarks.length)];
            //         //임의의 수량
            //         const qty = Math.floor(Math.random() * 10) + 1;
            //         //임의의 가격
            //         const price = (Math.floor(Math.random() * 5) + 1) * 500;
            //         localStorage.setItem(pk, JSON.stringify({date : date, number : i, code: code, name: name, price: price, qty: qty, remark: remark }));
            //     }
            // })
        }
    }//initLocalStorageData()

    //localStorage에서 데이터 불러오기
    fetchProductData() {
        const jsonString = localStorage.getItem('products');
        console.log()
    }



}

export default DataLoader;
