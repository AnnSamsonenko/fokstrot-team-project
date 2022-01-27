import { ViewModal } from './view_modal.js';
import { Publisher } from '../publisher.js';

export class ControllerModal {
  constructor() {
    this.view = new ViewModal();
    this.pub = new Publisher();

    this.pub.subscribe('ON_MODAL_CLICK', this.handleClickOpenNodal);

    this.pub.subscribe('ON_MODAL_CLICK_ON_CART', this.handelClickOpenModalCart);
    this.pub.subscribe('ADD_LISTENERS_DELTE_BUTTON', this.habdelAddListenersForDeleteButton);
  }

  handleClickOpenNodal = obj => {
    this.view.renderModal(obj);
    this.view.showModal();
    this.view.addListenersForCloseModalAndButtonClick();
  };
  handelClickOpenModalCart = obj => {
    this.view.renderCartModal(obj);
    this.view.showModal();
    this.view.addLisSentInfOrder();
    // this.view.addListenersForDeleteButton();
    this.view.addListenerForCloseModalCart();
  };
  habdelAddListenersForDeleteButton = () => {
    // this.view.addListenersForDeleteButton();
  };
}
