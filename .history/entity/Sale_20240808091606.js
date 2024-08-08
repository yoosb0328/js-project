class Sale {
    constructor(date, number, category, quantity, price, description) {
        this.date = date;
        this.number = number;
        this.dateNumber = date + "-" + number;
        this.number;
        this.category = category; // category 객체를 참조
        this.quantity = quantity;
        this.price = price;
        this.description = description;
    }
}
