import { ModelCards } from './model_cards.js';
import { View } from './view_cards.js';

export class ControllerCards {
  constructor() {
    this.model = new ModelCards();
    this.view = new View();
  }
  async init() {
    const formattedData = await this.model.fetchData();
    this.view.renderCards(formattedData);
  }
}
