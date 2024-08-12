import diContainer from "./common/DIContainer.js";

// export function router() {
//     const routes = {
//         "/": diContainer.get("IndexComponent"),
//         "/search/sale": diContainer.get("SearchSaleComponent"),
//     };

//     let path = window.location.pathname;
//     console.log(path);
//     const appElement = document.getElementById("app");
//     const Component = routes[path] ||  diContainer.get("IndexComponent");

//     appElement.innerHTML = ""; //내용 지우기.

//     if (Component) {
//         // 올바른 경로일 때 Component 렌더링
//         appElement.appendChild(Component.render());
//     } else {
//         // 404 페이지를 렌더링
//         appElement.innerHTML = "<h1>404 - Not Found</h1>";
//     }
// }

/*
Live Server Extension 환경 SPA 구현 한계 때문에 session storage에 path 저장 방식 활용
*/
let currentPath = sessionStorage.getItem("currentPath") || "/";
const Mode = diContainer.get("ModeService");

export function route(path) {
    currentPath = path;
    sessionStorage.setItem("currentPath", path);
    const routes = {
        "/": diContainer.get("IndexComponent"),
        "/search/sale": diContainer.get("SearchSaleComponent"),
        "/search/product": diContainer.get("SearchProductComponent"),
    };
    const appElement = document.getElementById("app");
    const Component = routes[path] || diContainer.get("IndexComponent");

    appElement.innerHTML = ""; //내용 지우기.

    if (Component) {
        // 올바른 경로일 때 Component 렌더링
        // appElement.appendChild(Component.init());
        Component.init();
    } else {
        // 404 페이지를 렌더링
        appElement.innerHTML = "<h1>404 - Not Found</h1>";
    }
}

export function routePopup(path, params) {
    const routes = {
        "/search/product": diContainer.get("SearchProductComponent"),
        "/modify/product": diContainer.get("EditProductComponent"),
        "/add/product": diContainer.get("EditProductComponent"),
    };

    const appElement = document.getElementById("app");
    const Component = routes[path] || diContainer.get("IndexComponent");
    if (Component && params != undefined) {
        Component.initModify(params);
    } else if (Component && params == undefined) {
        Component.init();
    } else {
        // 404 페이지를 렌더링
        appElement.innerHTML = "<h1>404 - Not Found</h1>";
    }
}

// export function navigateTo(path) {
//     history.pushState(null, null, path); // URL을 변경합니다.
//     router(); // router 함수를 호출하여 새로운 경로에 맞는 컴포넌트를 로드합니다.
// }

// function normalizePath(path) {
//     if (path.endsWith('/')) {
//         return path.slice(0, -1);
//     }
//     return path;
// }

window.addEventListener("DOMContentLoaded", route(currentPath));
