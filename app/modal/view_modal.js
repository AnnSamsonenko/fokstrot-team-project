import { Publisher } from "../publisher.js";

export class ViewModal {
    MAIN_REF = document.querySelector("main");

    constructor() {
        this.renderBackdrop();
        this.pub = new Publisher();
        // this.pub.subscribe("RENDER_CART", this.renderCartModal);
    }

    renderBackdrop() {
        const markup = `<div class='backdrop is-hidden'></div>`;
        this.MAIN_REF.insertAdjacentHTML("beforeend", markup);
    }

    renderModal({
        title,
        country,
        weight,
        brand,
        safetyTemperature,
        price,
        description,
        img,
        isInCart,
        id,
    }) {
        const refs = this.getRefs();
        const btnSelector = isInCart ? "button-delete" : "button-add";
        const btnText = isInCart ? "Видалити" : "Додати в кошик";
        const markup = `<div class="modal-card" data-id="${id}">
        <button type='button' class='modal-close'></button>
        <h4 class="modal-title">${title}</h4>
        <img src="${img}" alt="${title}" class="modal-img"/>
        <table class="modal__table">
          <tr>
            <td class="modal__table-refs">Бренд товару:</td>
            <td class="modal__table-value">${brand}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Країна виробництва:</td>
            <td class="modal__table-value">${country}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Умови зберiгання:</td>
            <td class="modal__table-value">${safetyTemperature}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Вага:</td>
            <td class="modal__table-value">${weight}</td>
          </tr>
        </table>
        <p class="modal-descr">${description}</p>
        <div class="modal-order">
          <span class="modal-price text-price">${price} ₴</span>
          <button class="card-button ${btnSelector} button-product-${id}"  type="button">${btnText}</button>
        </div>
      </div>`;
        refs.BACKDROP_REF.innerHTML = "";
        refs.BACKDROP_REF.insertAdjacentHTML("afterbegin", markup);
    }
    renderCartModal = (obj) => {
        const refs = this.getRefs();
        let html = "";
        let sumOrder = 0;

        for (let i = 0; i < obj.length; i++) {
            let numer = i + 1;
            sumOrder += obj[i].price * obj[i].isInCart;
            html += ` <tr data-id="${obj[i].id}" class="cart-item">
                        <th scope="row">${numer}</th>
                        <td><img src="${obj[i].img}" ></img></td>
                        <td>${obj[i].title}</td>
                        <td>${obj[i].country}</td>
                        <td>${obj[i].price}</td>
                        
                        <td> <input class="input-count-items-in-cart" type="number" min="1" max="100" step="1" data-id="${obj[i].id}"  value="${obj[i].isInCart}"></td>
                        <td> <button type="button" class="btn btn-danger btn-delete-from-cart" data-id="${obj[i].id}"></button></td>
                    </tr>`;
        }
        html += `<tr class="cart-item">
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td id='sumOrder'>${sumOrder.toFixed(2)}</td>
                        <td></td>
                        <td></td>
                       
                    </tr>`;

        const markup = `
        <div class="modal-card" >
        <button type='button' class='modal-close'></button>
        <div class='bodyCard'>
            <h2>Ваше замовлення </h2>
            <table id="cartTable"  class="table">
                <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col"></th>
                        <th scope="col">Назва</th>
                        <th scope="col">Країна</th>
                        <th scope="col">Ціна</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="tBodyIdCart">
                ${html}
                </tbody>
            </table>
                    <form id="formMakeOrder" class='form-info' novalidate>
                        <label for="nmailInput" class="form-label">Ваш Email</label>
                        <input type="text" class="form-control info-input info-input-email" id="EmailInput"  name="cliEmail">
                        
                        <label for="nameInput" class="form-label" >Ім'я</label>
                        <input type="text" class="form-control info-input info-input-name" id="nameInput" name="cliName" >

                        <label for="numnerPhoneInput" class="form-label">Номер телефону</label>
                        <input type="text" class="form-control info-input info-input-phone" id="numnerPhoneInput" name="cliPhone" >
                        
                        <button type="submit" class="btn btn-primary" id="btnMakeOrder">Оформити замовлення</button>
                    </form>
       </div>
        </div>`;

        //required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        //required
        // placeholder="380-000-000000" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{5}"
        refs.BACKDROP_REF.innerHTML = "";
        refs.BACKDROP_REF.insertAdjacentHTML("afterbegin", markup);
    };

    showModal() {
        document.querySelector(".backdrop").classList.remove("is-hidden");
        document.body.style.overflow = "hidden";
    }

    addListenersForCloseModalAndButtonClick() {
        const refs = this.getRefs();

        refs.BUTTON_CLOSE_REF.addEventListener("click", this.handleClick);
        window.addEventListener("keydown", this.handleClick);
        refs.BACKDROP_REF.addEventListener("click", this.handleClick);
    }

    handleClick = (event) => {
        const refs = this.getRefs();
        const { target, key } = event;

        if (
            target === refs.BACKDROP_REF ||
            target === refs.BUTTON_CLOSE_REF ||
            key === "Escape"
        ) {
            refs.BACKDROP_REF.classList.add("is-hidden");
            refs.BODY_REF.style.overflow = "";
            refs.BACKDROP_REF.removeEventListener("click", this.handleClick);
            refs.BUTTON_CLOSE_REF.removeEventListener(
                "click",
                this.handleClick
            );
            window.removeEventListener("keydown", this.handleClick);
        } else if (target.nodeName === "BUTTON") {
            this.pub.notify("ON_MODAL_BUTTON_CLICK", event);
        }
    };

    getRefs() {
        const refs = {
            BUTTON_CLOSE_REF: document.querySelector(".modal-close"),
            BACKDROP_REF: document.querySelector(".backdrop"),
            BODY_REF: document.body,
        };
        return refs;
    }

    addListenerForCloseModalCart() {
        const refs = this.getRefs();
        refs.BUTTON_CLOSE_REF.addEventListener("click", this.handleClickCart);
        window.addEventListener("keydown", this.handleClickCart);
        refs.BACKDROP_REF.addEventListener("click", this.handleClickCart);
    }

    handleClickCart = (event) => {
        const refs = this.getRefs();
        const { target, key } = event;
        if (
            target === refs.BACKDROP_REF ||
            target === refs.BUTTON_CLOSE_REF ||
            key === "Escape"
        ) {
            refs.BACKDROP_REF.classList.add("is-hidden");
            refs.BODY_REF.style.overflow = "";
            refs.BACKDROP_REF.removeEventListener(
                "click",
                this.handleClickCart
            );
            refs.BUTTON_CLOSE_REF.removeEventListener(
                "click",
                this.handleClickCart
            );
            const inputs = document.querySelectorAll(
                ".input-count-items-in-cart"
            );
            this.pub.notify("UPDATE_COUNT_ITEMS_CART", inputs);

            window.removeEventListener("keydown", this.handleClickCart);
        } else if (target.nodeName === "BUTTON") {
            this.pub.notify("ON_MODAL_BUTTON_CLICK", event);
            this.pub.notify("DELETE_ITEM_FROM_CART", event.target.dataset.id);
        }
    };
    addLisSentInfOrder = () => {
        const btn = document.querySelector("#btnMakeOrder");
        btn.addEventListener("click", (ev) => {
            this.pub.notify("ADD_LIS_BTN_MAKE_ORDER", ev);
        });
    };
    addListenerInputNum = () => {
        const inputs = document.querySelectorAll(".input-count-items-in-cart");
        inputs.forEach((value) => {
            value.addEventListener("change", (ev) => {
                this.pub.notify("ADD_LIS_INP_COUNT_ITEM", ev);
            });
        });
    };
    renderDoneViewOrder = () => {
        const bodyCart = document.querySelector(".bodyCard");
        const html =
            "<h3>Дякуємо за замовлення, через декілька хвилин вам зателефонуе менеджер</h3>";

        bodyCart.innerHTML = html;
    };
}
