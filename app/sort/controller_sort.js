import { ViewSort } from "./view_sort.js";

export class ControllerSort{
    constructor(controllerCard){
        this.view = new ViewSort();
        this.controllerCard = controllerCard;
        this.view.addEvent(this.controllerCard.sortData.bind(this.controllerCard))
    }
}