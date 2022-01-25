import { Publisher } from "../publisher.js";

export class ViewCart {
    constructor(handelClickOpenCartModal) {
        this.pub = new Publisher();
        this.handelClickOpenCartModal = handelClickOpenCartModal;
        this.addListenerBtnCart();
    }

    addListenerBtnCart(ev) {
        const btnCart = document.querySelector("#btnCart");
        btnCart.addEventListener("click", this.handelClickOpenCartModal, false);
    }

    renderItemsInCart(items) {
        if (items) {
            const tbody = document.querySelector("#tBodyIdCart");
            let html = ``;

            for (let i = 0; i < items.length; i++) {
                let numer = i + 1;
                html += ` <tr>
                        <th scope="row">${numer}</th>
                        <td><img src="${items[i].img}" ></img></td>
                        <td>${items[i].title}</td>
                        <td>${items[i].country}</td>
                        <td>${items[i].price}</td>
                        
                        <td> <input class="input-count-items-in-cart" type="number" min="1" max="100" step="1" data-id="${items[i].id}"  value="${items[i].isInCart}"></td>

                        <td> <button type="button" class="btn btn-danger btn-delete-from-cart" data-id="${items[i].id}"><i class="bi bi-trash"></i></button></td>
                    </tr>`;
            }
            tbody.innerHTML = html;
        } else {
            const table = document.querySelector("#cartTable");
            table.innerHTML = "";
            //disable. button
        }
    }
}
