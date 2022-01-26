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
      markup += `<button class="btn btn-pag btn-pag-${i + 1}"
                    value="${currentPage + i}">${currentPage + i}</button>`;
    }

    document.querySelector('.pagination').innerHTML = '';
    document.querySelector('.pagination').insertAdjacentHTML('afterbegin', markup);
  };

  addListenerForPag = listener => {
    document.querySelector('.pagination').addEventListener('click', listener);
  };

  removeActiveClass(currentPage) {
    const allPagBtns = document.querySelectorAll('.btn-pag');
    allPagBtns.forEach(button => button.classList.remove('btn-pag--active'));

    document.querySelector(`.btn-pag-${currentPage}`).classList.add('btn-pag--active');
  }

  destroyPagButtons() {
    document.querySelector('.pagination').innerHTML = '';
  }

  backToTop() {
    const SECTION_TITLE_REF = document.querySelector('.pasta-title');
    const { top: titleHeight } = SECTION_TITLE_REF.getBoundingClientRect();
    window.scrollBy({
      top: titleHeight,
      behavior: 'smooth',
    });
  }
}
