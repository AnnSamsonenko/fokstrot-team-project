import { ViewHeader } from './header_view.js';

export class ControllerHeader {
  constructor() {
    this.view = new ViewHeader();
    this.init();
  }
  init() {
    this.view.renderHeader();
  }
}
