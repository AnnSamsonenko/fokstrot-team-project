export class ViewCards {
  constructor(handleOpenModal) {
    document.querySelector('.row').addEventListener('click', handleOpenModal);
  }

  renderCards(data) {
    const markup = data
      .map(({ img, title, description, price, id }) => {
        return `<li class='col'>
             <article class='h-100'>
             <a class='card h-100' href="#" data-id="${id}">
                  <img src="${img}" class='card-img-top' alt='${title}' />
              <div class='card-body'>
                 <h3 class='card-title'>${title}</h3>
              </div>
              <div class="card-footer">
                    <button class='card-button' type="button">Додати в замовлення</button>
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
