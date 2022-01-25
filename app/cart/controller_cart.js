import { Publisher } from "../publisher.js";
import { ModelCart } from "./model_cart.js";
import { ViewCart } from "./view_cart.js";

export class ControllerCart {
    constructor() {
        this.view = new ViewCart(this.handelClickOpenCartModal);
        this.model = new ModelCart();
        this.pub = new Publisher();
        this.pub.subscribe(
            "DELETE_ITEM_FROM_CART",
            this.handelDeleteItemFromCart
        );
        this.pub.subscribe(
            "UPDATE_COUNT_ITEMS_CART",
            this.handleUpdateCountItemsCart
        );
    }
    handelClickOpenCartModal = (ev) => {
        const data = this.model.getItemsCart();
        if (data) {
            this.pub.notify("ON_MODAL_CLICK_ON_CART", data);
        }
    };
    handelDeleteItemFromCart = (id) => {
        console.log("11111111");
        // this.model.deleteItemCart(id);
        this.pub.notify("ON_BUTTON_DELETE_CLICK", { id });
        const data = this.model.getItemsCart();
        this.view.renderItemsInCart(data);
        this.pub.notify("ADD_LISTENERS_DELTE_BUTTON");
    };
    handleUpdateCountItemsCart = (inputs) => {
        inputs.forEach((item) => {
            this.model.updateItemsCart(item.dataset.id, item.value);
        });
    };
}
