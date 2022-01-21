export class ViewSection {
  DOC_MAIN = document.querySelector('main');
  renderSection() {
    const markup = `<section class='pasta'>
        <div class='container-md'>
          <h2 class='pasta-title'>Макароннi вироби</h2>
          <div class='control'></div>
          <ul class='row'></ul>
        </div>
      </section>`;
    this.DOC_MAIN.insertAdjacentHTML('afterbegin', markup);
  }
}
