export default class EditProductController {
    constructor(logger, dataLoader) {
        this.logger = logger;
        this.dataLoader = dataLoader;
    }

    saveProduct(product) {
        return this.dataLoader.saveProduct(product);
    }
}
