export class ViewPopup {
  BODY_REF = document.body;
  renderPopupContainer = () => {
    const markup = `<div id='popup'></div>`;
    this.BODY_REF.insertAdjacentHTML('afterbegin', markup);
  };

  onAddProduct = obj => {
    const CONTAINER_REF = document.querySelector('#popup');
    const markup = `
    <div class="popup-card popup-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" fill="currentColor" class="bi bi-cart-check-fill popup-cart-add" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
        </svg>
        <p class="popup-message">Товар ${obj.title} успiшно додано!</p>
    </div>`;

    CONTAINER_REF.innerHTML = '';
    CONTAINER_REF.insertAdjacentHTML('afterbegin', markup);

    const POP_UP_REF = document.querySelector('.popup-success');

    POP_UP_REF.classList.add('show-up');
    setTimeout(() => {
      POP_UP_REF.classList.remove('show-up');
      POP_UP_REF.classList.add('hide-down');
    }, 2000);
  };

  onDelProduct = obj => {
    const CONTAINER_REF = document.querySelector('#popup');
    const markup = `
    <div class="popup-card popup-delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" fill="currentColor" class="bi bi-cart-x-fill popup-cart-del" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
</svg>
        <p class="popup-message">Товар ${obj.title} видалено з кошику!</p>
    </div>`;

    CONTAINER_REF.innerHTML = '';
    CONTAINER_REF.insertAdjacentHTML('afterbegin', markup);

    const POP_UP_REF = document.querySelector('.popup-delete');
    POP_UP_REF.classList.add('show-up');

    setTimeout(() => {
      POP_UP_REF.classList.remove('show-up');
      POP_UP_REF.classList.add('hide-down');
    }, 2000);
  };
}
