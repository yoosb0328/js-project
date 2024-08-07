class DIContainer {
    constructor() {
        if (!DIContainer.instance) {
            this.services = new Map();
            DIContainer.instance = this;
        }
    }
} //class DIContainer
