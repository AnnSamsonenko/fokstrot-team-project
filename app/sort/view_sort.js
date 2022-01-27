export class ViewSort {
  constructor(handleClickBntSort, handleChangeSelect) {
    this.renderButton();
    this.handleClickBntSort = handleClickBntSort;
    this.handleChangeSelect = handleChangeSelect;
    this.addListenersForSelect(this.handleChangeSelect);
    this.addEvent(this.handleClickBntSort);
  }

  renderButton() {
    const controlBlock = document.querySelector('.control');
    controlBlock.innerHTML = `
        <div class="d-flex justify-content-around align-items-center">
            <div class='sort-btns-wrapper'>
                <span class="sort-btns-option">Вартiсть</span>
                <div class="sort-btns">
                <button type="button" class="btn-sort btn-sort-up" data-sort='sort-up'>&#129045;</button>
                <button type="button" class="btn-sort btn-sort-down" data-sort='sort-down'>&#129047;</button>
                </div> 
            </div> 
            <div class="d-flex align-items-baseline block-filter">
                <label for="brandSelector" class="filter-label">Бренд</label>
                <select id='brandSelector'class="form-select" aria-label="Default select example" data-filter="brand">
                </select>
            
                <label for="contrySelector" class="filter-label">Країна</label>
                <select id="contrySelector" class="form-select" aria-label="Default select example " data-filter="country">
                </select>
            </div>
        </div>`;
  }

  addEvent(listener) {
    const buttons = document.querySelectorAll('.btn-sort');

    buttons.forEach(item => {
      item.addEventListener('click', listener);
    });
  }

  addOptionFilter = obj => {
    const select = document.querySelector(`#${obj.id}`);
    let html = `<option value="all">Всі</option>`;
    html += obj.data.map(item => ` <option value="${item}">${item}</option>`).join('\n');

    select.innerHTML = html;
  };
  addListenersForSelect = ev => {
    const options = document.querySelectorAll('select');
    options.forEach(item => {
      item.addEventListener('change', ev);
    });
  };
  disenableSelector = id => {
    document.querySelector(id).setAttribute('disabled', 'disabled');
  };
  enableSelector = id => {
    document.querySelector(id).removeAttribute('disabled');
  };

  setActiveButton(event) {
    if (event.target.classList.contains('btn-sort-up')) {
      event.target.classList.add('btn-sort--active');
      document.querySelector('.btn-sort-down').classList.remove('btn-sort--active');
    } else if (event.target.classList.contains('btn-sort-down')) {
      event.target.classList.add('btn-sort--active');
      document.querySelector('.btn-sort-up').classList.remove('btn-sort--active');
    } else {
      const allSortBtns = document.querySelectorAll('.btn-sort');
      allSortBtns.forEach(button => button.classList.remove('btn-sort--active'));
    }
  }
}
