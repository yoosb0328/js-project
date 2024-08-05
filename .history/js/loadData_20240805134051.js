import { DataStore } from "./data/DataStore.js";

const dataStore = DataStore.getInstance();

if (dataStore.categories.length === 0 && dataStore.sales.length === 0) {
    dataStore.loadFromLocalStorage();
}
