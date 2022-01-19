export class View {
  renderCards(data) {
    const markup = data
      .map(({ img, title, description, brand, country, weight, price, safetyTemperature }) => {
        let cutDescr = '';
        if (description.length > 150) {
          cutDescr = description.slice(0, 151) + '...';
        } else {
          cutDescr = description;
        }
        return `<li class='col'>
             <article class='h-100'>
             <a class='card h-100' href="#">
                  <img src="${img}" class='card-img-top' alt='${title}' />
              <div class='card-body'>
                 <h3 class='card-title'>${title}</h3>
                 <div class='card-info'>
                    <p class='card-text'> ${cutDescr}</p>
                    <p class="card-brand">${brand}, ${country}</p>
                 </div>  
              </div>
              <div class="card-footer">
                    <small class="text-muted">${safetyTemperature} &#8451;</small>
                    <small class="text-muted">${weight}</small>
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
