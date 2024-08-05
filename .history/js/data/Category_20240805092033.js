import { DataStore } from "./DataStore.js";

export class Category {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    modifyName(name, dataStore) {
        this.name = name;
        dataStore.updateSales(name);
    }

    //Getter
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
}
