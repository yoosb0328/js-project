class DataLoader {
    constructor(logger, dataStore) {
        this.logger = logger;
        this.dataStore = dataStore;
    }

    initLocalStorageData() {
        //local Storage에 dummy data 생성
        const dates = [
            "2024-08-04",
            "2024-08-03",
            "2024-08-03",
            "2024-08-02",
            "2024-08-01",
            "2024-07-31",
        ];
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
        // const dataStore = diContainer.get("dataStore");
        // !this.dataStore.products && !this.dataStore.sales
        if (!localStorage.getItem("products") && !localStorage.getItem("sales")) {
            this.logger.log(`DataLoader : initLocalStorageData()`);
            const codes = [];
            const productMap = new Map();
            const saleMap = new Map();
            //품목 정보 입력
            names.forEach((name, index) => {
                const code = index <= 5 ? "P10000" + index : "P20000" + index;
                codes.push(code);
                productMap.set(code, name);
                const MapArray = Array.from(productMap.entries());
                localStorage.setItem("products", JSON.stringify(MapArray));
            });

            dates.forEach((date) => {
                for (let i = 5; i >= 1; i--) {
                    const code = codes[Math.floor(Math.random() * codes.length)];
                    const name = productMap.get(code);
                    const pk = date + "-" + i;
                    const remark = remarks[Math.floor(Math.random() * remarks.length)];
                    //임의의 수량
                    const qty = Math.floor(Math.random() * 10) + 1;
                    //임의의 가격
                    const price = (Math.floor(Math.random() * 5) + 1) * 500;
                    saleMap.set(pk, {
                        date: date,
                        number: i,
                        code: code,
                        name: name,
                        price: price,
                        qty: qty,
                        remark: remark,
                    });
                    const MapArray = Array.from(saleMap.entries()); // map -> array
                    localStorage.setItem("sales", JSON.stringify(MapArray)); // array -> json
                }
            });
        }
    } //initLocalStorageData()

    insertSampleData() {
        const prodData = [
            { prodCode: 'A001', prodName: '새우깡', price: 1000 },
            { prodCode: 'B001', prodName: '매운새우깡', price: 1500},
            { prodCode: 'C001', prodName: '쌀새우깡', price: 1300},
            { prodCode: 'D001', prodName: '감자깡', price: 1200},
            { prodCode: 'E001', prodName: '진라면', price: 1400},
            { prodCode: 'F001', prodName: '신라면', price: 1600}
        ];
        
        // 판매 샘플데이터
        const salesData = [
            { data_dt: '2024-08-05', data_no: 1, prodCode: 'A001', prodName: '새우깡', quantity: 10, price: 1000, remarks: ''},
            { data_dt: '2024-08-05', data_no: 2, prodCode: 'B001', prodName: '매운새우깡', quantity: 5, price: 1500, remarks: '' },
            { data_dt: '2024-08-05', data_no: 3, prodCode: 'C001', prodName: '쌀새우깡', quantity: 20, price: 500, remarks: '' },
            { data_dt: '2024-08-05', data_no: 4, prodCode: 'C001', prodName: '쌀새우깡', quantity: 8, price: 2000, remarks: '' },
            { data_dt: '2024-08-05', data_no: 5, prodCode: 'A001', prodName: '새우깡', quantity: 10, price: 1000, remarks:'' },
            { data_dt: '2024-08-06', data_no: 1, prodCode: 'B001', prodName: '매운새우깡', quantity: 5, price: 1500, remarks: '' },
            { data_dt: '2024-08-06', data_no: 2, prodCode: 'C001', prodName: '쌀새우깡', quantity: 20, price: 500, remarks: '' },
            { data_dt: '2024-08-06', data_no: 3, prodCode: 'C001', prodName: '쌀새우깡', quantity: 8, price: 2000, remarks: '' },
            { data_dt: '2024-08-06', data_no: 4, prodCode: 'A001', prodName: '새우깡', quantity: 10, price: 1000, remarks:'' },
            { data_dt: '2024-08-06', data_no: 5, prodCode: 'B001', prodName: '매운새우깡', quantity: 5, price: 1500, remarks: '' },
            { data_dt: '2024-08-06', data_no: 6, prodCode: 'C001', prodName: '쌀새우깡', quantity: 20, price: 500, remarks: '' },
            { data_dt: '2024-08-06', data_no: 7, prodCode: 'C001', prodName: '쌀새우깡', quantity: 8, price: 2000, remarks: '' },
            { data_dt: '2024-08-07', data_no: 1, prodCode: 'E001', prodName: '진라면', quantity: 30, price: 1400, remarks: '대량구매' },

        ];
        try {
            if (!localStorage.getItem("products") && !localStorage.getItem("sales")) {
                const productMap = new Map();
                const saleMap = new Map();

                prodData.forEach((data) => {
                    productMap.set(data.prodCode, { prodName : data.prodName, price: data.price.toLocaleString()});
                })
                const productMapArray = Array.from(productMap.entries());
                localStorage.setItem("products", JSON.stringify(productMapArray));
                salesData.forEach((data) => {
                    const pk = `${data.data_dt}-${data.data_no}`;
                    console.log(pk);
                    saleMap.set(pk, { 
                        data_dt : data.data_dt, 
                        data_no : data.data_no, 
                        prodCode: data.prodCode, 
                        prodName : data.prodName, 
                        quantity: data.quantity, 
                        price: data.price.toLocaleString(), 
                        remarks: data.remarks});
                })
                const saleMapArray = Array.from(saleMap.entries());
                localStorage.setItem("sales", JSON.stringify(saleMapArray)); // array -> json
            }
        } catch (error) {
            this.logger.err(error);
        }
    }


    //localStorage에서 데이터 불러오기
    loadFromLocalStorage() {
        try {
            const localProducts = localStorage.getItem("products");
            const localSales = localStorage.getItem("sales");
            const productsArray = JSON.parse(localProducts);
            const salesArray = JSON.parse(localSales);

            // productsArray.forEach((product) => {
            //     this.dataStore.products.set(product[0], product[1]);
            // });

            // salesArray.forEach(([key, value]) => {
            //     this.dataStore.sales.set(key, value);
            // });

            this.logger.log("DataLoader : loadFromLocalStorage()");
        } catch (error) {
            this.logger.err(error);
        }
    }

    getProducts() {
        try {
            //렌더링을 위해서 배열로 변환하여 리턴합니다.
            const localProducts = localStorage.getItem("products");
            const productsArray = JSON.parse(localProducts);
            productsArray.forEach((product) => {
                this.dataStore.products.set(product[0], product[1]);
            });

            return Array.from(this.dataStore.products);
        } catch (error) {
            this.logger.err(error);
        }
    }

    getSales() {
        try {
            const localSales = localStorage.getItem("sales");
            const salesArray = JSON.parse(localSales);
            salesArray.forEach(([key, value]) => {
                this.dataStore.sales.set(key, value);
            });
            
            //렌더링을 위해서 배열로 변환하여 리턴합니다.
            return Array.from(this.dataStore.sales);
        } catch {
            this.logger.err(error);
        }
    }

    saveProduct(product) {
        const prodCode = product[0];
        let flag = true;

        try {
            const localProducts = localStorage.getItem("products");
            const productsArray = JSON.parse(localProducts);
            productsArray.forEach((data) => {
                const dataProdCode = data[0];
                if(dataProdCode === prodCode) {
                    console.log(`prodCode === dataProdCode : ${prodCode === dataProdCode}`);
                    return false;
                }
            });
            for(let i=0; i<productsArray.length; i++) {
                const data = productsArray[i];
                const dataProdCode = data[0];
                if(dataProdCode === prodCode) {
                    flag = false;
                    break;
                }
            }
            if(flag) {
                productsArray.push(product);
                localStorage.setItem("products", JSON.stringify(productsArray));
            }
            
        } catch (error) {
            this.logger.err(error);
        } finally {
            return flag;
        }
    }

}

export default DataLoader;
