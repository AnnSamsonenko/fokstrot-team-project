import { ModelCards } from './model_cards.js';
import { View } from './view_cards.js';

export class ControllerCards {
  constructor() {
    this.model = new ModelCards();
    this.view = new View();
    this.init();
  }
  async init() {
    const formattedData = await this.model.fetchData();
    this.view.renderCards(formattedData);
  }
  handleClickSort(sortType) {
    console.log(this)
    let result = this.model.getSortData(sortType);
    this.view.renderCards(result);
  }
}
