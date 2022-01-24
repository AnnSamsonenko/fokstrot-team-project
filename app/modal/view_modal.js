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
        <button type='button' class='modal-close'>X</button>
        <h4 class="modal-title">${title}</h4>
        <img src="${img}" alt="${title}" class="modal-img"/>
        <p class="modal-descr">${description}</p>
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
        let trStr = "";

        for (let i = 0; i < obj.length; i++) {
            let numer = i + 1;
            trStr += ` <tr>
                        <th scope="row">${numer}</th>
                        <td><img src="${obj[i].img}" ></img></td>
                        <td>${obj[i].title}</td>
                        <td>${obj[i].country}</td>
                        <td>${obj[i].price}</td>
                        
                        <td> <input class="input-count-items-in-cart" type="number" min="1" max="100" step="1" data-id="${obj[i].id}"  value="${obj[i].isInCart}"></td>
                        <td> <button type="button" class="btn btn-danger btn-delete-from-cart" data-id="${obj[i].id}"><i class="bi bi-trash"></i></button></td>
                    </tr>`;
        }

        const markup = `
        <div class="modal-card" >
        <button type='button' class='modal-close'>X</button>
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
            ${trStr}
            </tbody>
        </table>
        <form>
            <label for="nmailInput" class="form-label">Email address</label>
            <input type="email" class="form-control" id="EmailInput" aria-describedby="emailHelp">

            <label for="nameInput" class="form-label">Ім'я</label>
            <input type="text" class="form-control" id="nameInput">

            <label for="numnerPhoneInput" class="form-label">tel</label>
            <input type="email" class="form-control" id="numnerPhoneInput" placeholder="38 (000)-000-0000">
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

        </div>`;
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
    addListenersForDeleteButton = () => {
        console.log("@@@@@@@@@@");
        const buttons = document.querySelectorAll(".btn-delete-from-cart");

        buttons.forEach((item) => {
            item.addEventListener("click", () => {
                console.log(item.dataset.id);
                this.pub.notify("DELETE_ITEM_FROM_CART", item.dataset.id);
            });
        });
    };
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
            refs.BACKDROP_REF.removeEventListener("click", this.handleClick);
            refs.BUTTON_CLOSE_REF.removeEventListener(
                "click",
                this.handleClick
            );
            const inputs = document.querySelectorAll(
                ".input-count-items-in-cart"
            );
            this.pub.notify("UPDATE_COUNT_ITEMS_CART", inputs);

            window.removeEventListener("keydown", this.handleClick);
        } else if (target.nodeName === "BUTTON") {
            this.pub.notify("ON_MODAL_BUTTON_CLICK", event);
        }
    };
}
