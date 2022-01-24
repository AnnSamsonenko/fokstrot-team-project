export class ViewButton {
  changeButtonAddType({ id }) {
    const buttonAddRef = document.querySelectorAll(`.button-product-${id}`);
    buttonAddRef.forEach(button => {
      button.textContent = 'Видалити';
      button.classList.remove('button-add');
      button.classList.add('button-delete');
    });
  }

  changeButtonDeleteType({ id }) {
    const buttonDelRef = document.querySelectorAll(`.button-product-${id}`);
    buttonDelRef.forEach(button => {
      button.textContent = 'Додати в кошик';
      button.classList.remove('button-delete');
      button.classList.add('button-add');
    });
  }
}
