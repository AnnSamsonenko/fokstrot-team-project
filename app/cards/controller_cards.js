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
  sortData(event){
    const sortType = {'sort-up':1,"sort-down":-1};
    const dataSort = event.target.getAttribute("data-sort")
    let result = this.model.data.sort((a,b)=>{
      return (a.price - b.price)*sortType[dataSort]
    })
    this.view.renderCards(result)
  }
}
