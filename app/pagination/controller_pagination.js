import { Publisher } from '../publisher.js';
import { ViewPagination } from './view_pagination.js';
import { ModelPagination } from './model_pagination.js';

export class ControllerPagination {
  constructor() {
    this.view = new ViewPagination();
    this.model = new ModelPagination();
    this.init();
    this.pub = new Publisher();
    this.pub.subscribe('ON_INIT_PAG', this.initPagination);
  }

  init() {
    this.view.renderWrapper();
    this.view.addListenerForPag(this.handlePagClick);
  }

  initPagination = data => {
    const { totalPages, currentPage } = this.model.countTotalPages(data);
    if (totalPages === 0) {
      this.view.destroyPagButtons();
      return;
    }

    this.view.createPagButtons(totalPages, currentPage);
    this.view.removeActiveClass(currentPage);
    const gapForSlicing = this.model.buildPage();
    this.pub.notify('ON_BUILD_PAGE', gapForSlicing);
  };

  handlePagClick = event => {
    if (event.target === event.currentTarget) {
      return;
    }

    if (event.target.nodeName === 'BUTTON') {
      const clickedPage = Number(event.target.value);
      const gapForSlicing = this.model.buildPage(clickedPage);
      this.pub.notify('ON_BUILD_PAGE', gapForSlicing);
      this.view.removeActiveClass(clickedPage);
      this.view.backToTop();
    }
  };
}
