import {Pagination} from "../model/pagination/Pagination";
import {Sort} from "../model/sorting/Sort";
import {ActivatedRoute} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class SortPageSearchBasic{

  public pagination: Pagination;
  public sorting: Sort;
  public searchRequest: string;

  protected constructor(public route: ActivatedRoute) {
    const page = this.route.snapshot.queryParams['page'];
    if(page == null)
      this.pagination = new Pagination(1);
    else
      this.pagination = new Pagination(page);

    const by = this.route.snapshot.queryParams['sort'];
    const order = this.route.snapshot.queryParams['order'];
    if(by && order)
      this.sorting = new Sort(by, order);
    else
      this.sorting = new Sort("id", "asc")
    const param = this.route.snapshot.queryParams['searchRequest'];

    if(param == null)
      this.searchRequest = "";
    else
      this.searchRequest = param;
  }

  abstract getItems():void;

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      const searchRequest = this.route.snapshot.queryParams['searchRequest'];
      if(searchRequest != null && !searchRequest.includes("/")) {
        this.searchRequest = searchRequest;
        this.getItems()
      }
    })
  }
}
