export class ViewModal {
  MAIN_REF = document.querySelector('main');

  constructor() {
    this.renderBackdrop();
  }

  renderBackdrop() {
    const markup = `<div class='backdrop is-hidden'></div>`;
    this.MAIN_REF.insertAdjacentHTML('beforeend', markup);
  }

  renderModal({ title, country, weight, brand, safetyTemperature, price, description, img }) {
    const refs = this.getRefs();
    const markup = `<div class="modal-card">
        <button type='button' class='modal-close'>X</button>
        <h4 class="modal-title">${title}</h4>
        <img src="${img}" alt="${title}" class="modal-img"/>
        <p class="modal-descr">${description}</p>
        <table class="modal__table">
          <tr>
            <td class="modal__table-refs">Бренд товару:</td>
            <td class="modal__table-value">${brand}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Країна виробництва:</td>
            <td class="modal__table-value">${country}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Умови зберiгання:</td>
            <td class="modal__table-value">${safetyTemperature}</td>
          </tr>
          <tr>
            <td class="modal__table-refs">Вага:</td>
            <td class="modal__table-value">${weight}</td>
          </tr>
        </table>

        <div class="modal-order">
          <span class="modal-price text-price">${price} ₴</span>
          <button class="card-button modal-add" id='button-add-modal' type="button">Додати в кошик</button>
        </div>
      </div>`;
    refs.BACKDROP_REF.innerHTML = '';
    refs.BACKDROP_REF.insertAdjacentHTML('afterbegin', markup);
  }

  showModal() {
    document.querySelector('.backdrop').classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
  }

  addListenersForCloseModal() {
    const refs = this.getRefs();

    refs.BUTTON_CLOSE_REF.addEventListener('click', this.closeModal);
    window.addEventListener('keydown', this.closeModal);
    refs.BACKDROP_REF.addEventListener('click', this.closeModal);
  }

  closeModal = ({ target, key }) => {
    const refs = this.getRefs();

    if (target === refs.BACKDROP_REF || target === refs.BUTTON_CLOSE_REF || key === 'Escape') {
      refs.BACKDROP_REF.classList.add('is-hidden');
      refs.BODY_REF.style.overflow = '';
      refs.BACKDROP_REF.removeEventListener('click', this.closeModal);
      refs.BUTTON_CLOSE_REF.removeEventListener('click', this.closeModal);
      window.removeEventListener('keydown', this.closeModal);
    }
  };

  getRefs() {
    const refs = {
      BUTTON_CLOSE_REF: document.querySelector('.modal-close'),
      BACKDROP_REF: document.querySelector('.backdrop'),
      BODY_REF: document.body,
    };
    return refs;
  }
}
