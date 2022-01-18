export default class ViewCards {
    BLOCK_CARDS = document.querySelector('#cards');

    renderCards(macaroni){
        this.BLOCK_CARDS.innerHTML = macaroni.map(this.getCardHTML).join('');

    }

    getCardHTML({title, brand, country,price, img}){
        return `<div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${brand}</p>
                <p class="card-text">${country}</p>
                <p class="card-text">${price}</p>
            </div>
        </div>`;
    }


}