import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {HttpRequestService} from "../http/HttpRequestService";
import {HttpResponseService} from "../http/HttpResponseService";
import {PaginationDto} from "../../model/pagination/PaginationDto";

@Injectable({
  providedIn: 'root'
})
export class PaginationService extends HttpRequestService{

  getPagination(url: string, searchRequest: string, page: number){
    const options = {
      params: new HttpParams()
        .set('searchRequest', searchRequest)
        .set('page', page)
    };

    return new HttpResponseService(this.http.post<PaginationDto>(`${this.host}${this.port}/api/pagination/${url}`, {}, options));
  }
}
