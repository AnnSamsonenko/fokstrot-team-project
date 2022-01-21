export class ViewButton {
  changeButtonAddType({ id }) {
    const buttonAddRef = document.querySelector(`#product-${id}`);
    buttonAddRef.textContent = 'Видалити';
    buttonAddRef.classList.remove('button-add');
    buttonAddRef.classList.add('button-delete');
  }

  changeButtonDeleteType({ id }) {
    const buttonAddRef = document.querySelector(`#product-${id}`);
    buttonAddRef.textContent = 'Додати в кошик';
    buttonAddRef.classList.remove('button-delete');
    buttonAddRef.classList.add('button-add');
  }
}
