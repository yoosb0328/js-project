export default class HomeComponent {
    getView() {
        // 템플릿 문자열로 페이지를 렌더링합니다.
        return `
            <div class="home-page">
                <h1>Welcome to the Home Page</h1>
                <p>Here is some content...</p>
                <button id="loadDataBtn">Load Data</button>
            </div>
        `;
    }
}
