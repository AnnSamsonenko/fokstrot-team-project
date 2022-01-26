export class ViewPagination {
  REF_MAIN = document.querySelector('main');
  ITEMS_PER_PAGE = 12;
  NUMBER_OF_ITEMS = null;
  CURRENT_PAGE = null;

  renderWrapper = () => {
    this.REF_MAIN.insertAdjacentHTML('beforeend', '<div class="pagination"></div>');
  };

  createPagButtons = (totalPages, currentPage) => {
    let markup = '';
    for (let i = 0; i < totalPages; i += 1) {
      markup += `<button class="btn btn-primary"
                    value="${currentPage + i}">${currentPage + i}</button>`;
    }

    document.querySelector('.pagination').innerHTML = '';
    document.querySelector('.pagination').insertAdjacentHTML('afterbegin', markup);
  };

  addListenerForPag = listener => {
    document.querySelector('.pagination').addEventListener('click', listener);
  };
}
