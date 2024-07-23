export class Filter {
  field: string;
  condition: string;
  value: string;
  logicalRelation: string;

  title: string;
  active: boolean = false;

  constructor(field: string, condition: string, value: string, logicalRelation: string,
              title: string = '') {
    this.field = field;
    this.condition = condition;
    this.value = value;
    this.logicalRelation = logicalRelation.toUpperCase();
    this.title = title;
  }
}
