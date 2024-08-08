class Sale {
    /*
    Map에 date + number를 조합해서 KEY로 저장.
    */
    constructor(date, number, product, qty, price, remarks) {
        this.date = date; //string,   YYYY/DD/MM
        this.number = number;
        this.product = product; // product 객체를 참조
        this.qty = qty;
        this.price = price;
        this.remarks = remarks;
    }
}

export default Sale;
