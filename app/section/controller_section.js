import { ViewSection } from './view_section.js';

export class ControllerSection {
  constructor() {
    this.view = new ViewSection();
    this.init();
  }
  init() {
    this.view.renderSection();
  }
}
