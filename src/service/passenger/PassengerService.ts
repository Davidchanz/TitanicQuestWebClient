import {Injectable} from "@angular/core";
import {HttpRequestService} from "../http/HttpRequestService";
import {Passengers} from "../../model/passenger/Passengers";
import {HttpResponseService} from "../http/HttpResponseService";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Pagination} from "../../model/pagination/Pagination";
import {Sort} from "../../model/sorting/Sort";
import {Filters} from "../../model/filter/Filters";

@Injectable({
  providedIn: "root",
})
export class PassengerService extends HttpRequestService{

  getPassengers(page: Pagination, pageSize: number, sorting: Sort, searchRequest: string = '', filters: Filters){
    const options = {
      params: new HttpParams()
        .set('page', page.number)
        .set('pageSize', pageSize)
        .set('sort', sorting.by)
        .set('order', sorting.order)
        .set('searchRequest', searchRequest)};

    let activeFilters = new Filters(filters.filters.filter(filter => filter.active))

    return new HttpResponseService(this.http.post<Passengers>(`${this.host}${this.port}/api/passengers`, activeFilters, options));
  }

}
