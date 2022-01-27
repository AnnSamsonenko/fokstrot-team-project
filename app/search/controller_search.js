import { Publisher } from '../publisher.js';
import { ViewSearch } from './view_search.js';

export class ControllerSearch {
  constructor() {
    this.view = new ViewSearch(this.handleSearch);
    this.pub = new Publisher();
  }

  handleSearch = ev => {
    const searchParam = document.querySelector('#searchInput').value;
    this.pub.notify('ON_SEARCH_CHANGE', searchParam);
    this.pub.notify('ON_SORT_REMOVE', ev);
  };
}
