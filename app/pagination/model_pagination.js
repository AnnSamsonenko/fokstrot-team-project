export class ModelPagination {
  REF_MAIN = document.querySelector('main');
  ITEMS_PER_PAGE = 12;
  NUMBER_OF_ITEMS = null;
  CURRENT_PAGE = null;

  countTotalPages = ({ wholeData, currentPage }) => {
    this.NUMBER_OF_ITEMS = wholeData.length;
    this.CURRENT_PAGE = currentPage;
    const totalPages = Math.ceil(this.NUMBER_OF_ITEMS / this.ITEMS_PER_PAGE);
    return { totalPages, currentPage: this.CURRENT_PAGE };
  };

  buildPage = clickedPage => {
    this.CURRENT_PAGE = clickedPage ? clickedPage : 1;
    const trimStart = (this.CURRENT_PAGE - 1) * this.ITEMS_PER_PAGE;
    const trimEnd = trimStart + this.ITEMS_PER_PAGE;
    return { trimStart, trimEnd };
  };
}
