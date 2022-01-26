import { ViewButton } from './view_button.js';
import { Publisher } from '../publisher.js';
import { ModelButton } from './model_button.js';

export class ControllerButton {
  constructor() {
    this.model = new ModelButton();
    this.view = new ViewButton();
    this.pub = new Publisher();

    this.pub.subscribe('ON_BUTTON_ADD_CLICK', this.handleAddClick);
    this.pub.subscribe('ON_BUTTON_DELETE_CLICK', this.handleDelClick);
  }

  handleAddClick = obj => {
    this.model.addObjToLocalStorage(obj);
    this.view.changeButtonAddType(obj);
    this.pub.notify('ON_ADD_MESSAGE', obj);
  };

  handleDelClick = obj => {
    this.model.removeObjFromLocalStorage(obj);
    this.view.changeButtonDeleteType(obj);
    this.pub.notify('ON_DELETE_MESSAGE', obj);
  };
}
