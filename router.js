import HomeComponent from "./HomeComponent.js";

export function router() {
    const routes = {
        "/": Home(),
        "/sales": Sales(),
        "/products": Products(),
    };

    const path = window.location.pathname;
    const Component = routes[path] || HomeComponent; // 기본 경로는 홈
    const appElement = document.getElementById("app");
    appElement.innerHTML = routes[path] || "<h1>404 - Not Found</h1>";
}
