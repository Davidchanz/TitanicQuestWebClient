import {Injectable} from "@angular/core";
import {HttpRequestService} from "../http/HttpRequestService";
import {Passengers} from "../../model/passenger/Passengers";
import {HttpResponseService} from "../http/HttpResponseService";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PassengerService extends HttpRequestService{

  getPassengers(page: number, pageSize: number, sort: string,
                order: string, searchRequest: string){
    const options = {
      params: new HttpParams()
        .set('page', page)
        .set('pageSize', pageSize)
        .set('sort', sort)
        .set('order', order)
        .set('searchRequest', searchRequest)};

    return new HttpResponseService(this.http.post<Passengers>(`${this.host}${this.port}/api/passengers`, {}, options));
  }

}
