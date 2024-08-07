class DIContainer {
    constructor() {
        if (!DIContainer.instance) {
            this.services = new Map();
            DIContainer.instance = this;
        }
        return DIContainer.instance;
    } //constructor()
} //class DIContainer
