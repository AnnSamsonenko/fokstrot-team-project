export class ViewSort{
    constructor(handleClickBntSort){
        this.renderButton();
        this.handleClickBntSort = handleClickBntSort;
        this.addEvent(this.handleClickBntSort);
    }

    renderButton(){
        const controlBlock = document.querySelector('.control');
        controlBlock.innerHTML = `<button type="button" class="btn btn-secondary btn-sort" data-sort='sort-up'>Sort price Up</button>
        <button type="button" class="btn btn-secondary btn-sort" data-sort='sort-down'>Sort price Down</button>`
    }

    addEvent(listener){
        const buttons = document.querySelectorAll('.btn-sort');

        buttons.forEach(item=>{
            item.addEventListener('click',listener);
        })
    }
}