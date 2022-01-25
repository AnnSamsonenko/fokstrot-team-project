export class ModelCart {
    getItemsCart() {
        const data = localStorage.getItem("cart");
        return JSON.parse(data);
    }
    deleteItemCart(id) {
        const data = JSON.parse(localStorage.getItem("cart"));
        if (data.length > 1) {
            const result = data.filter((item) => {
                return item.id !== id;
            });

            localStorage.setItem("cart", JSON.stringify(result));
        }
        if (data.length === 1) {
            localStorage.removeItem("cart");
        }
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
}