import { Category } from "./Category.js";
import { Sale } from "./Sale.js";

export class DataStore {
    constructor() {
        //DataStore 인스턴스가 있는 경우 그대로 반환 (싱글톤 목적)
        if (DataStore.instance) {
            return DataStore.instance;
        }
        /* 
        sales : 날짜순으로 내림차순 정렬이 매번 필요하기 때문에 array 선택
                + sales 배열에 삽입 시, 중간이 아닌 맨 끝에 삽입하면 시간복잡도 단축.
        categories : Map에 key(code) , value(name) 으로 저장할 경우 품목명 검색이 어려우므로 배열 선택.
        */
        this.map = new Map(); //품목 코드 - 이름으로 저장.
        this.sales = []; //

        // 메모리 관리를 위해 인스턴스를 싱글톤으로 설정
        DataStore.instance = this;
    }

    //인스턴스 호출
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    assignDateNumbers() {
        const dateNumberMap = {}; // 날짜별 번호를 저장하는 객체

        this.sales.forEach((sale) => {
            // 날짜를 기준으로 번호를 매기기 위해 초기화
            if (!dateNumberMap[sale.date]) {
                dateNumberMap[sale.date] = 1;
            } else {
                dateNumberMap[sale.date]++;
            }
            // dateNumber 필드 설정
            sale.dateNumber = `${sale.date}-${dateNumberMap[sale.date]}`;
        });
    }
    countNumber(date) {
        let count = 1;
        this.sales.forEach((sale) => {
            if (sale.date === date) count++;
        });
        return count;
    }
    /* 
    메모리 데이터 조작.
    */
    addCategory(code, name) {
        //코드가 같은 카테고리가 있는 지 중복 체크
        this.loadFromLocalStorage();
        const exist = this.categories.findIndex((cat) => code === cat.code);
        if (exist === -1) {
            this.categories.push(new Category(code, name));
            this.saveToLocalStorage();
            return true; //생성 완료
        } else return false;
    }

    addSale(sale) {
        //일자+번호가 같은 카테고리가 있는 지 중복 체크
        const exist = this.sales.findIndex((s) => s.dateNumber === sale.dateNumber);
        if (exist === -1) {
            this.sales.push(sale);
            return true;
        } else return false;
    }

    //카테고리 명 수정.
    updateCategoryName(code, name) {
        this.loadFromLocalStorage();
        this.categories.forEach((cat) => {
            if (cat.code === code) {
                cat.name = name;
            }
        });
        console.log(this.categories);
        console.log(this.sales);
        //로컬 스토리지에 변경 사항 반영.
        this.saveToLocalStorage();
    } //updateCategoryName()

    //카테고리명이 바뀌면 판매 정보 데이터도 수정.
    updateSalesByName(code, name) {
        this.sales.forEach((sale) => {
            if (sale.category.code === code) {
                sale.category.name = name;
            }
        });
    } //updateSalesByName()

    updateSale(dateNumber, categoryCode, quantity, price, description) {
        console.log(dateNumber, categoryCode, quantity, price, description);
        // 로컬 스토리지에서 데이터를 불러와 메모리에 할당
        this.loadFromLocalStorage();
        console.log(this.sales);
        const inputDateNumber = dateNumber;
        const saleToUpdate = this.sales.find((sale) => {
            const saleDateNumber = sale.dateNumber.trim();

            return saleDateNumber === inputDateNumber;
        });
        if (saleToUpdate) {
            saleToUpdate.quantity = quantity;
            saleToUpdate.price = price;
            saleToUpdate.description = description;
            // 수정된 데이터를 로컬 스토리지에 저장
            this.saveToLocalStorage();
            return true;
        } else {
            console.error("No sale found with the specified dateNumber and categoryCode.");
            return false;
        }
    } //updateSale()

    //품목 검색
    searchCategories(code, name) {
        return this.categories.filter((category) => {
            // 모든 조건이 주어졌을 때
            if (code && name) {
                return category.code === code && category.name === name;
            }
            // code만 주어졌을 때
            if (code && !name) {
                return category.code === code;
            }
            // name만 주어졌을 때
            if (!code && name) {
                return category.name === name;
            }
            // 둘 다 주어지지 않은 경우 빈 배열 반환
            return false;
        });
    }

    //판매 검색
    searchSales(from, to, codes, description) {
        const startDate = new Date(from);
        const endDate = new Date(to);

        const result = this.sales.filter((sale) => {
            const saleDate = new Date(sale.date);
            const isWithinDateRange = saleDate >= startDate && saleDate <= endDate;
            //!description : codes.length가 0 인 경우 true
            const matchesCode = codes.length === 0 || codes.includes(sale.category.code);
            //!description : description이 null, undefined, "" 인 경우 true.
            const matchesDescription = !description || sale.description.includes(description);
            return isWithinDateRange && matchesCode && matchesDescription;
        });
        return result;
    } //searchSales()

    /*
    로컬 스토리지 데이터 조작
    */

    // JSON.stringify로 변환하여 로컬 스토리지에 저장
    saveToLocalStorage() {
        console.log("saveToLocal");
        const data = {
            categories: this.categories.map((category) => ({
                code: category.code,
                name: category.name,
            })),
            sales: this.sales.map((sale) => ({
                dateNumber: sale.dateNumber,
                date: sale.date,
                category: sale.category,
                quantity: sale.quantity,
                price: sale.price,
                description: sale.description,
            })),
        };
        localStorage.setItem("appData", JSON.stringify(data));
    }

    // 로컬 스토리지에서 데이터를 불러와 메모리에 할당
    loadFromLocalStorage() {
        console.log("loadFromLocal");
        const data = localStorage.getItem("appData");

        if (data) {
            const parsedData = JSON.parse(data);
            // 로컬 스토리지에서 가져온 데이터를 categories와 sales로 분리합니다.
            if (parsedData.categories) {
                this.categories = parsedData.categories.map(
                    (cat) => new Category(cat.code, cat.name)
                );
            }
            //sales에 저장해야 함.
            if (parsedData.sales) {
                console.log(parsedData.sales);
                this.sales = parsedData.sales.map((sale) => {
                    // 저장된 category 데이터에서 Category 객체를 찾아 복원
                    const category = this.categories.find((cat) => cat.code === sale.category.code);

                    // Sale 객체 생성
                    return new Sale(
                        sale.date,
                        category,
                        sale.quantity,
                        sale.price,
                        sale.description,
                        this
                    );
                });
            }
            this.sales.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return data;
    } //loadFromLocalStorage()
}

//문자열 검사
function logStringDetails(str, name) {
    console.log(`${name} length:`, str.length);
    console.log(`${name} content:`, [...str].map((char) => char.charCodeAt(0)).join(" "));
}
