export class ViewSort{
    constructor(){
        this.renderButton();
        this.addEvent();
    }

    renderButton(){
        const controlBlock = document.querySelector('.control');
        controlBlock.innerHTML = `<button type="button" class="btn btn-secondary btn-sort" data-sort='sort-up'>Sort price Up</button>
        <button type="button" class="btn btn-secondary btn-sort" data-sort='sort-down'>Sort price Down</button>`
    }

    addEvent(sort){
        const buttons = document.querySelectorAll('.btn-sort');

        buttons.forEach(item=>{
            item.addEventListener('click',sort);
        })
    }
}