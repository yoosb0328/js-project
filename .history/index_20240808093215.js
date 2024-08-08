import diContainer from "./common/DIContainer.js";

console.log("index.js is loaded");

// DIContainer에서 ModeService와 DataStore 가져오기
const modeService = diContainer.get("modeService");
console.log("ModeService:", modeService);

const dataStore = diContainer.get("dataStore");
console.log("DataStore:", dataStore);
