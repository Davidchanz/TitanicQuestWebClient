import {Injectable} from "@angular/core";
import {HttpRequestService} from "../http/HttpRequestService";
import {Passengers} from "../../model/passenger/Passengers";
import {HttpResponseService} from "../http/HttpResponseService";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Pagination} from "../../model/pagination/Pagination";
import {Sort} from "../../model/sorting/Sort";

@Injectable({
  providedIn: "root",
})
export class PassengerService extends HttpRequestService{

  getPassengers(page: Pagination, pageSize: number, sorting: Sort, searchRequest: string = ''){
    const options = {
      params: new HttpParams()
        .set('page', page.number)
        .set('pageSize', pageSize)
        .set('sort', sorting.by)
        .set('order', sorting.order)
        .set('searchRequest', searchRequest)};

    return new HttpResponseService(this.http.post<Passengers>(`${this.host}${this.port}/api/passengers`, {}, options));
  }

}
