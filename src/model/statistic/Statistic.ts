import {Filter} from "../filter/Filter";

export class Statistic {
  operation: string;
  field: string;
  filters: Filter[];

  title: string;

  constructor(operation: string, field: string, filters: Filter[], title: string) {
    this.operation = operation;
    this.field = field;
    this.filters = filters;
    this.title = title;
  }
}
