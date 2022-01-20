import { Publisher } from "../publisher.js";
import { ViewSort } from "./view_sort.js";

export class ControllerSort {
    constructor() {
        this.view = new ViewSort(
            this.handleClickBntSort,
            this.handleChangeSelect
        );
        this.pub = new Publisher();
        this.pub.subscribe("ADD_OPTION_FILTER", this.handleAddOporFilter);
    }

    handleClickBntSort = (event) => {
        const sortType = event.target.getAttribute("data-sort");
        this.pub.notify("ON_SORT_CLICK", sortType);
    };
    handleChangeSelect = (ev) => {
        const select = ev.target;
        const filerOption = select.options[select.selectedIndex].value;
        console.log(filerOption);
    };

    handleAddOporFilter = (obj) => {
        this.view.addOptionFilter(obj);
        // this.view.addListenersForSelect(ev);
    };
}
