import {Filter} from "./Filter";

export class FilterCheckBox {
  filters: Filter[];
  active: boolean;
  title: string;

  constructor(filters: Filter[], title: string, active: boolean = false) {
    this.filters = filters;
    this.active = active;
    this.title = title;
  }
}
