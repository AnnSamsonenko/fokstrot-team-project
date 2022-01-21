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
      <div class='sort-btns-wrapper'>
        <button type="button" class="btn-sort" data-sort='sort-up'>Вартiсть &#129045;</button>
        <button type="button" class="btn-sort" data-sort='sort-down'>Вартiсть &#129047;</button> 
       <div/> 
        <section>
        <label for="brandSelector">Brand</label>
        <select id='brandSelector'class="form-select" aria-label="Default select example" data-filter="brand">

        </select>
        </section>
        <section>
        <label for="contrySelector">Country</label>
        <select id="contrySelector" class="form-select" aria-label="Default select example " data-filter="country">
            
        </select>
        </section>`;
  }

  addEvent(listener) {
    const buttons = document.querySelectorAll('.btn-sort');

    buttons.forEach(item => {
      item.addEventListener('click', listener);
    });
  }

  addOptionFilter = obj => {
    const select = document.querySelector(`#${obj.id}`);
    let html = `<option value="all">ALL</option>`;
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
}
