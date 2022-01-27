export class ModelCart {
    constructor() {
        localStorage.setItem("historyOrders", JSON.stringify([]));
    }
    getItemsCart() {
        const data = localStorage.getItem("cart");
        return JSON.parse(data);
    }

    updateItemsCart(id, updateData) {
        const data = JSON.parse(localStorage.getItem("cart"));
        const result = data.map((value) => {
            if (value.id === id) {
                value.isInCart = updateData;
            }
            return value;
        });
        localStorage.setItem("cart", JSON.stringify(result));
    }
    getSumOrder() {
        const data = this.getItemsCart();
        const result = data.reduce((acc, obj) => {
            return acc + obj.price * obj.isInCart;
        }, 0);
        return result.toFixed(2);
    }
}
