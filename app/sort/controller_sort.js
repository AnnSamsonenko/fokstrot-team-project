import { Publisher } from "../publisher.js";
import { ViewSort } from "./view_sort.js";

export class ControllerSort{
    constructor(){
        
        this.view = new ViewSort(this.handleClickBntSort);
        this.pub = new Publisher();
    }
    handleClickBntSort =event=>{
        const sortType = event.target.getAttribute('data-sort');

        this.pub.notice('ON_CLICK_SORT',sortType)
    }
    
}