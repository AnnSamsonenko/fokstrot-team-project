import { Publisher } from '../publisher.js';
import { ModelCards } from './model_cards.js';
import { ViewCards } from './view_cards.js';

export class ControllerCards {
  constructor() {
    this.model = new ModelCards();
    this.view = new ViewCards(this.handleCardClick);
    this.init();
    this.pub = new Publisher();
    this.pub.subscribe('ON_SORT_CLICK', this.handleClickSort);
    this.pub.subscribe('ON_FILTER_CLICK', this.handleFilterData);
        this.pub.subscribe("ON_SEARCH_CHANGE", this.handleSearchData);
    }

  async init() {
    const formattedData = await this.model.fetchData();
    this.view.renderCards(formattedData);
    this.addOptionForFilter('brandSelector', 'brand');
    this.addOptionForFilter('contrySelector', 'country');
  }

  handleClickSort = sortType => {
    let result = this.model.getSortData(sortType);
    this.view.renderCards(result);
  };

  handleCardClick = event => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      return;
    } else if (event.target.nodeName === 'BUTTON') {
      const buttonType = this.checkButtonMod(event);
      const objForStorage = this.getCardInfo(event);
      if (buttonType === 'ADD') {
        const updatedObjForStorage = this.model.updateDataForCart(objForStorage, 1);
        this.pub.notify('ON_BUTTON_ADD_CLICK', updatedObjForStorage);
      } else if (buttonType === 'DELETE') {
        const updatedObjForStorage = this.model.updateDataForCart(objForStorage, 0);
        this.pub.notify('ON_BUTTON_DELETE_CLICK', updatedObjForStorage);
      }
      return;
    } else {
      const objectForModal = this.getCardInfo(event);
      this.pub.notify('ON_MODAL_CLICK', objectForModal);
    }
  };

  addOptionForFilter = (idSelect, titleRow) => {
    const brandFilter = [...new Set(this.model.intermediateData.map(item => item[titleRow]))];
    const arg = {
      id: idSelect,
      data: brandFilter,
    };
    this.pub.notify('ADD_OPTION_FILTER', arg);
  };

  handleFilterData = ({ filterOption, filter }) => {
    const result = this.model.getFilterData(filter, filterOption);
    this.view.renderCards(result);
  };

  getCardInfo(event) {
    const card = event.target.closest('.card');
    const id = card.dataset.id;
    const objectActiveCard = this.model.getObjForModalById(id);
    return objectActiveCard;
  }

  checkButtonMod(event) {
    if (event.target.classList.contains('button-add')) {
      return 'ADD';
    } else if (event.target.classList.contains('button-delete')) {
      return 'DELETE';
    }
  }
    handleSearchData = (title) => {
        const result = this.model.getSearchDaraByTitle(title);
        this.view.renderCards(result);
    };
}
