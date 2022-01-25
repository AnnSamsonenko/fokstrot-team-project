export class ViewPagination {
  REF_MAIN = document.querySelector('main');
  ITEMS_PER_PAGE = 12;
  NUMBER_OF_ITEMS = null;
  CURRENT_PAGE = null;

  countTotalPages = ({ wholeData, currentPage }) => {
    this.NUMBER_OF_ITEMS = wholeData.length;
    this.CURRENT_PAGE = currentPage;
    const numberOfPages = Math.ceil(this.NUMBER_OF_ITEMS / this.ITEMS_PER_PAGE);
    let markup = '';

    for (let i = 0; i < numberOfPages; i += 1) {
      markup += `<button class="btn btn-primary"
    value="${this.CURRENT_PAGE + i}">${this.CURRENT_PAGE + i}</button>`;
    }
    return markup;
  };

  renderWrapper = () => {
    this.REF_MAIN.insertAdjacentHTML('beforeend', '<div class="pagination"></div>');
  };

  createPagButtons = markup => {
    document.querySelector('.pagination').innerHTML = '';
    document.querySelector('.pagination').insertAdjacentHTML('afterbegin', markup);
  };

  buildPage = clickedPage => {
    this.CURRENT_PAGE = clickedPage ? clickedPage : 1;
    const trimStart = (this.CURRENT_PAGE - 1) * this.ITEMS_PER_PAGE;
    const trimEnd = trimStart + this.ITEMS_PER_PAGE;
    return { trimStart, trimEnd };
  };

  addListenerForPag = listener => {
    document.querySelector('.pagination').addEventListener('click', listener);
  };
}
