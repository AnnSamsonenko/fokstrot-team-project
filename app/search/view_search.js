export class ViewSearch {
  CONTROL_BLOCK = document.querySelector('.control');
  constructor(handleSearch) {
    this.renderSearch();
    this.addlistenersForSearch(handleSearch);
  }
  renderSearch() {
    const markup = `
        <div class="input-group mb-3 mt-2">
        
  <input id="searchInput" type="text" class="form-control" placeholder="Назва товару" aria-label="Пошук" >
</div>`;
    this.CONTROL_BLOCK.insertAdjacentHTML('beforeend', markup);
  }

  addlistenersForSearch = ev => {
    const inputSearch = document.querySelector('#searchInput');
    inputSearch.addEventListener('input', ev);
  };
}
