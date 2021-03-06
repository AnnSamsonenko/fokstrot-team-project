import { Publisher } from '../publisher.js';
import { ModelCart } from './model_cart.js';
import { ViewCart } from './view_cart.js';

export class ControllerCart {
  constructor() {
    this.view = new ViewCart(this.handelClickOpenCartModal);
    this.model = new ModelCart();
    this.pub = new Publisher();
    this.pub.subscribe('DELETE_ITEM_FROM_CART', this.handelDeleteItemFromCart);
    this.pub.subscribe('UPDATE_COUNT_ITEMS_CART', this.handleUpdateCountItemsCart);
    this.pub.subscribe('ADD_LIS_BTN_MAKE_ORDER', this.sendInfOrder);
    this.pub.subscribe('ADD_LIS_INP_COUNT_ITEM', this.handleChangeInputNum);
  }
  handelClickOpenCartModal = ev => {
    const data = this.model.getItemsCart();
    if (data) {
      this.pub.notify('ON_MODAL_CLICK_ON_CART', data);
    } else {
      this.pub.notify('ON_EMPTY_CART');
    }
  };
  handelDeleteItemFromCart = id => {
    const data = this.model.getItemsCart();
    if (data) {
      this.view.renderItemsInCart(data);
      this.pub.notify('ADD_LISTENERS_DELTE_BUTTON');
    } else {
      this.view.renderItemsInCart(data);
      this.view.disableOrderBtn();
    }
  };
  handleUpdateCountItemsCart = inputs => {
    inputs.forEach(item => {
      this.model.updateItemsCart(item.dataset.id, parseInt(item.value));
    });
  };
  sendInfOrder = ev => {
    const itemsOrder = JSON.parse(localStorage.getItem('cart'));

    if (itemsOrder != 0) {
      const formInputs = document.querySelectorAll('.info-input');
      const inputEmail = document.querySelector('.info-input-email');
      const inputPhone = document.querySelector('.info-input-phone');
      const inputName = document.querySelector('.info-input-name');
      const emailVal = inputEmail.value;
      const phoneVal = inputPhone.value;
      const nameVal = inputName.value;
      const emptyInputs = Array.from(formInputs).filter(input => input.value === '');

      formInputs.forEach(input => {
        if (input.value === '') {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      if (emptyInputs.length !== 0) {
        console.log('inputs not filled');
        return false;
      }
      if (!ViewCart.validateEmail(emailVal)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        return false;
      } else {
        inputEmail.classList.remove('error');
      }
      if (ViewCart.validateCountry(emailVal)) {
        console.log('email from Columbia');
        inputEmail.classList.add('error');
        return false;
      } else {
        inputEmail.classList.remove('error');
      }
      if (!ViewCart.validatePhone(phoneVal)) {
        console.log('phone not valid');
        inputPhone.classList.add('error');
        return false;
      } else {
        inputPhone.classList.remove('error');
      }

      const ID_CHAR = 134790138;
      const TG_BASE_URL =
        'https://api.telegram.org/bot5185514605:AAGlTejFxHndFXm4_9X65IN1Svt0-_Jz4yQ/sendMessage?';
      let text = `???????? ??????????????????%0A????\'??: ${nameVal}%0A??????: ${phoneVal}%0AEmail: ${emailVal}%0A`;
      let sumOrder = 0;
      const dateOrder = Date.now();

      itemsOrder.forEach(value => {
        text += `?????????? ???????????? ${value['id']} ?????????????????? ${value['isInCart']}%0A`;
        sumOrder += parseFloat(value['price']) * value['isInCart'];
      });

      sumOrder = sumOrder.toFixed(2);
      const countProducts = itemsOrder.length;
      text += `C???????? ???????????? ${sumOrder}`;

      const data = JSON.parse(localStorage.getItem('historyOrders'));

      data.push({ dateOrder, countProducts, sumOrder });
      localStorage.setItem('historyOrders', JSON.stringify(data));

      const url = `${TG_BASE_URL}chat_id=${ID_CHAR}&text=${text}`;
      fetch(url);
      this.pub.notify('RENDER_DONE_VIEW_CART');
      localStorage.removeItem('cart');
      this.pub.notify('ON_AFTER_ORDER_INIT');
    } else {
      ev.target.classList.add('disabled');
    }
  };

  handleChangeInputNum = ev => {
    const idCartProduct = ev.target.getAttribute('data-id');
    const coutnCartProduct = ev.target.value;
    this.model.updateItemsCart(idCartProduct, parseInt(coutnCartProduct));
    const sumOrder = document.querySelector('#sumOrder');
    sumOrder.innerHTML = this.model.getSumOrder();
  };
}
