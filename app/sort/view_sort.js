export class ViewSort {
    constructor(handleClickBntSort, handleChangeSelect) {
        this.renderButton();
        this.handleClickBntSort = handleClickBntSort;
        this.handleChangeSelect = handleChangeSelect;
        this.addListenersForSelect(this.handleChangeSelect);
        this.addEvent(this.handleClickBntSort);
    }

    renderButton() {
        const controlBlock = document.querySelector(".control");
        controlBlock.innerHTML = `<button type="button" class="btn btn-secondary btn-sort" data-sort='sort-up'>Sort price Up</button>
        <button type="button" class="btn btn-secondary btn-sort" data-sort='sort-down'>Sort price Down</button> 
        <section>
        <label for="brandSelector">Brand </label>
        <select id='brandSelector'class="form-select" aria-label="Default select example">

        </select>
        </section>
        <section>
        <label for="contrySelector">Country </label>
        <select id="contrySelector" class="form-select" aria-label="Default select example">
            
        </select>
        </section>`;
    }

    addEvent(listener) {
        const buttons = document.querySelectorAll(".btn-sort");

        buttons.forEach((item) => {
            item.addEventListener("click", listener);
        });
    }

    addOptionFilter = (obj) => {
        const select = document.querySelector(`#${obj.id}`);
        select.innerHTML = obj.data
            .map((item) => ` <option value="${item}">${item}</option>`)
            .join("\n");
    };
    addListenersForSelect = (ev) => {
        const options = document.querySelectorAll("select");
        options.forEach((item) => {
            item.addEventListener("change", ev);
        });
    };
}
