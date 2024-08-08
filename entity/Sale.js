class Sale {
    constructor(date, number, product, qty, price, remarks) {
        this.date = date; //string,   YYYY/DD/MM
        this.number = number;
        this.pk = date +"-"+number; //string YYYY/DD/MM-number
        this.product = product; // product 객체를 참조
        this.qty = qty;
        this.price = price;
        this.remarks = remarks;
    }
}

export default Sale;
