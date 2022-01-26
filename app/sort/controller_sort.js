import { Publisher } from '../publisher.js';
import { ViewSort } from './view_sort.js';

export class ControllerSort {
  constructor() {
    this.view = new ViewSort(this.handleClickBntSort, this.handleChangeSelect);
    this.pub = new Publisher();
    this.pub.subscribe('ADD_OPTION_FILTER', this.handleAddOporFilter);
    this.pub.subscribe('ON_SORT_REMOVE', this.view.setActiveButton);
  }

  handleClickBntSort = event => {
    const sortType = event.target.getAttribute('data-sort');
    this.pub.notify('ON_SORT_CLICK', sortType);
    this.view.setActiveButton(event);
  };

  handleChangeSelect = ev => {
    const select = ev.target;
    const filter = ev.target.getAttribute('data-filter');

    const filterOption = select.options[select.selectedIndex].value;

    if (filterOption === 'all') {
      if (filter === 'brand') {
        this.view.enableSelector('#contrySelector');
      }
      if (filter === 'country') {
        this.view.enableSelector('#brandSelector');
      }
    } else {
      if (filter === 'brand') {
        this.view.disenableSelector('#contrySelector');
      }
      if (filter === 'country') {
        this.view.disenableSelector('#brandSelector');
      }
    }

    this.pub.notify('ON_FILTER_CLICK', { filterOption, filter });
    this.view.setActiveButton(ev);
  };

  handleAddOporFilter = obj => {
    this.view.addOptionFilter(obj);
    // this.view.addListenersForSelect(ev);
  };
}
