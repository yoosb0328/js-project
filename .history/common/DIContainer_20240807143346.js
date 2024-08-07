class DIContainer {
    constructor() {
        if (!DIContainer.instance) {
            this.services = new Map();
            DIContainer.instance = this;
        }
        return DIContainer.instance;
    } //constructor()

    register(key, instance) {
        this.services.set(key, instance);
    }

    get(key) {
        if (!this.services.has(key)) {
            throw new Error(`Service ${key} not found`);
        }
        return this.services.get(key);
    }
} //class DIContainer
