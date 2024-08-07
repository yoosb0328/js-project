class DIContainer {
    constructor() {
        if (!DIContainer.instance) {
            this.beans = new Map();
            DIContainer.instance = this;
        }
        return DIContainer.instance;
    } //constructor()

    register(key, instance) {
        this.beans.set(key, instance);
    }

    get(key) {
        if (!this.beans.has(key)) {
            throw new Error(`${key}는 DI Container에 등록되지 않았습니다.`);
        }
        return this.beans.get(key);
    }
} //class DIContainer

// 싱글톤 인스턴스 생성
const diContainer = new DIContainer();

export default diContainer;
