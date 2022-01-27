import { Publisher } from "../publisher.js";

export class ViewCart {
    constructor(handelClickOpenCartModal) {
        this.pub = new Publisher();
        this.handelClickOpenCartModal = handelClickOpenCartModal;

        this.addListenerBtnCart();
        // this.addListenerInputNum();
    }

    addListenerBtnCart(ev) {
        const btnCart = document.querySelector("#btnCart");
        btnCart.addEventListener("click", this.handelClickOpenCartModal, false);
    }

    renderItemsInCart(items) {
        if (items) {
            const tbody = document.querySelector("#tBodyIdCart");
            let html = ``;
            let sumOrder = 0;
            for (let i = 0; i < items.length; i++) {
                let numer = i + 1;
                sumOrder += items[i].price * items[i].isInCart;
                html += ` <tr data-id="${items[i].id}" class="cart-item">
                        <th scope="row">${numer}</th>
                        <td><img src="${items[i].img}" ></img></td>
                        <td>${items[i].title}</td>
                        <td>${items[i].country}</td>
                        <td>${items[i].price}</td>
                        
                        <td> <input class="input-count-items-in-cart" type="number" min="1" max="100" step="1" data-id="${items[i].id}"  value="${items[i].isInCart}" onkeydown="return false"></td>

                        <td> <button type="button" class="btn btn-danger btn-delete-from-cart" data-id="${items[i].id}"></button></td>
                    </tr>`;
            }
            html += `<tr class="cart-item">
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>Сума</td>
                        <td id='sumOrder'>${sumOrder}</td>
                        <td></td>
                        <td></td>
                       
                    </tr>`;

            tbody.innerHTML = html;
        } else {
            const table = document.querySelector("#cartTable");
            table.innerHTML = "";
            //disable. button
        }
    }
    disableOrderBtn() {
        const bnt = document.querySelector("#btnMakeOrder");
        bnt.classList.add("disabled");
    }

    static validateEmail(email) {
        let re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validateCountry(country) {
        let re = new RegExp(".co$");
        return re.test(String(country).toLowerCase());
    }
    static validatePhone(phone) {
        let re = /^[0-9\s]*$/;
        return re.test(String(phone));
    }
}
