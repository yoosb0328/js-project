import { DataStore } from "./data/DataStore.js";

const SALES_PER_PAGE = 10;
let currentPage = 1;
let totalPages = 1;

const dataStore = new DataStore();

const data = dataStore.loadFromLocalStorage();

function renderSales() {

}
