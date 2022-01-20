import { Publisher } from '../publisher.js';
import { ModelCards } from './model_cards.js';
import { ViewCards } from './view_cards.js';

export class ControllerCards {
  constructor() {
    this.model = new ModelCards();
    this.view = new ViewCards(this.handleOpenModal);
    this.init();
    this.pub = new Publisher();
    this.pub.subscribe('ON_SORT_CLICK', this.handleClickSort);
  }

  async init() {
    const formattedData = await this.model.fetchData();
    this.view.renderCards(formattedData);
  }

  handleClickSort = sortType => {
    let result = this.model.getSortData(sortType);
    this.view.renderCards(result);
  };

  handleOpenModal = event => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      return;
    }
    const objectForModal = this.model.getObjForModalById(event);
    this.pub.notify('ON_MODAL_CLICK', objectForModal);
  };
}
