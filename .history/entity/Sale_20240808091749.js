class Sale {
    constructor(date, number, product, qty, price, remarks) {
        this.date = date;
        this.number = number;
        this.product = product; // product 객체를 참조
        this.qty = qty;
        this.price = price;
        this.remarks = remarks;
    }
}
