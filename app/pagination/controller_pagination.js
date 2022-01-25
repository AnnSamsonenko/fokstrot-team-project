import { Publisher } from '../publisher.js';
import { ViewPagination } from './view_pagination.js';

export class ControllerPagination {
  constructor() {
    this.view = new ViewPagination();
    this.init();
    this.pub = new Publisher();
    this.pub.subscribe('ON_INIT_PAG', this.initPagination);
  }

  init() {
    this.view.renderWrapper();
  }

  initPagination = data => {
    const markupForPag = this.view.countTotalPages(data);
    this.view.createPagButtons(markupForPag);
    this.view.addListenerForPag(this.handlePagClick);
    const gapForSlicing = this.view.buildPage();
    this.pub.notify('ON_BUILD_PAGE', gapForSlicing);
  };

  handlePagClick = event => {
    if (event.target === event.currentTarget) {
      return;
    }

    if (event.target.nodeName === 'BUTTON') {
      const clickedPage = Number(event.target.value);
      const gapForSlicing = this.view.buildPage(clickedPage);
      this.pub.notify('ON_BUILD_PAGE', gapForSlicing);
    }
  };
}
