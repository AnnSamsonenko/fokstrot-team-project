import { Publisher } from "../publisher.js";
import { ModelCards } from "./model_cards.js";
import { ViewCards } from "./view_cards.js";

export class ControllerCards {
    constructor() {
        this.model = new ModelCards();
        this.view = new ViewCards(this.handleOpenModal);
        this.init();
        this.pub = new Publisher();
        this.pub.subscribe("ON_SORT_CLICK", this.handleClickSort);
        this.pub.subscribe("ON_FILTER_CLICK", this.handleFilterData);
    }

    async init() {
        const formattedData = await this.model.fetchData();
        this.view.renderCards(formattedData);
        this.addOptionForFilter("brandSelector", "brand");
        this.addOptionForFilter("contrySelector", "country");
    }

    handleClickSort = (sortType) => {
        let result = this.model.getSortData(sortType);
        this.view.renderCards(result);
    };

    handleOpenModal = (event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            return;
        }
        const objectForModal = this.model.getObjForModalById(event);
        this.pub.notify("ON_MODAL_CLICK", objectForModal);
    };
    addOptionForFilter = (idSelect, titleRow) => {
        const brandFilter = [
            ...new Set(
                this.model.intermediateData.map((item) => item[titleRow])
            ),
        ];
        const arg = {
            id: idSelect,
            data: brandFilter,
        };
        this.pub.notify("ADD_OPTION_FILTER", arg);
    };
    handleFilterData = ({ filterOption, filter }) => {
        console.log(filter);
        console.log(filterOption);

        const result = this.model.getFilerData(filter, filterOption);
        // if (filter == "brand") {
        //     this.addOptionForFilter("contrySelector", "country");
        // } else {
        //     this.addOptionForFilter("brandSelector", "brand");
        // }
        // this.addOptionForFilter("brandSelector", "brand");

        this.view.renderCards(result);
        // this.addOptionForFilter("brandSelector", "brand");
        // this.addOptionForFilter("contrySelector", "country");
    };
}
