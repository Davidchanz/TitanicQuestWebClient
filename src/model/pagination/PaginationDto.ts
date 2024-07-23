import {Pagination} from "./Pagination";

export class PaginationDto {
  pagination: Array<Pagination>;

  constructor(pagination: Array<Pagination>) {
    this.pagination = pagination;
  }
}
