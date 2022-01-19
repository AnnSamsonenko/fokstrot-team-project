import { ViewSort } from "./view_sort.js";

export class ControllerSort{
    constructor(handleClickSortByControllerCards){
        this.handleClickSortByControllerCards = handleClickSortByControllerCards;
        this.view = new ViewSort(this.handleClickBntSort.bind(this));
    }
    handleClickBntSort(event){
        const sortType = event.target.getAttribute('data-sort');
        this.handleClickSortByControllerCards(sortType);
    }
    
}