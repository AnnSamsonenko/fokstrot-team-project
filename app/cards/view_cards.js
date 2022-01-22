export class ViewCards {
  constructor(handleCardClick) {
    document.querySelector('.row').addEventListener('click', handleCardClick);
  }

  renderCards(data) {
    const markup = data
      .map(({ img, title, price, id, isInCart }) => {
        const btnSelector = isInCart ? 'button-delete' : 'button-add';
        const btnText = isInCart ? 'Видалити' : 'Додати в кошик';

        return `<li class='col-12 col-sm-6 col-lg-4 col-xl-3 g-4'>
             <article class='h-100'>
             <a class='card h-100' href="#" data-id="${id}">
                  <img src="${img}" class='card-img-top' alt='${title}' />
              <div class='card-body'>
                 <h3 class='card-title'>${title}</h3>
              </div>
              <div class="card-footer">
                    <button class='card-button ${btnSelector}' id="product-${id}" type="button">${btnText}</button>
                    <small class="text-muted text-price">${price} ₴</small>
              </div>
              </a>
             </article>
          </li>`;
      })
      .join('');
    document.querySelector('.row').innerHTML = '';
    document.querySelector('.row').insertAdjacentHTML('afterbegin', markup);
  }
}
