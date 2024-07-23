export class Pagination {
  active: boolean;
  number: number;

  constructor(number: number) {
    this.active = false;
    this.number = number;
  }
}
