import { Publisher } from '../publisher.js';
import { ModelCards } from './model_cards.js';
import { View } from './view_cards.js';

export class ControllerCards {
  constructor() {
    this.model = new ModelCards();
    this.view = new View();
    
   

    this.init();
    this.pub = new Publisher();
    this.pub.subscribe('ON_CLICK_SORT', this.handleClickSort)
  }
  async init() {
    const formattedData = await this.model.fetchData();
    this.view.renderCards(formattedData);
  }
  
  handleClickSort = sortType => {
    let result = this.model.getSortData(sortType);
    this.view.renderCards(result);
  }
}
