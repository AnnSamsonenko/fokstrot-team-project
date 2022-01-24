import { ViewModal } from './view_modal.js';
import { Publisher } from '../publisher.js';

export class ControllerModal {
  constructor() {
    this.view = new ViewModal();
    this.pub = new Publisher();

    this.pub.subscribe('ON_MODAL_CLICK', this.handleClickOpenNodal);
  }

  handleClickOpenNodal = obj => {
    this.view.renderModal(obj);
    this.view.showModal();
    this.view.addListenersForCloseModalAndButtonClick();
  };
}
