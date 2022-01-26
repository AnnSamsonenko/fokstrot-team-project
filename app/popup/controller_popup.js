import { ViewPopup } from './view_popup.js';
import { Publisher } from '../publisher.js';

export class ControllerPopup {
  constructor() {
    this.view = new ViewPopup();
    this.pub = new Publisher();
    this.init();
    this.pub.subscribe('ON_ADD_MESSAGE', this.onAddProduct);
    this.pub.subscribe('ON_DELETE_MESSAGE', this.onDeleteProduct);
  }

  init = () => {
    this.view.renderPopupContainer();
  };
  onAddProduct = obj => {
    this.view.onAddProduct(obj);
  };
  onDeleteProduct = obj => {
    this.view.onDelProduct(obj);
  };
}
