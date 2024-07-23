import {Injectable} from "@angular/core";
import {HttpRequestService} from "../http/HttpRequestService";
import {HttpResponseService} from "../http/HttpResponseService";
import {SearchGuess} from "../../model/search/SearchGuess";
import {Filters} from "../../model/filter/Filters";
import {Statistic} from "../../model/statistic/Statistic";
import {HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
export class StatisticService extends HttpRequestService{

  getStatistic(url: string, statistics: Statistic, filters: Filters, searchRequest: string){

    let formParams = new FormData();
    formParams.append('statistics',
      new Blob([JSON.stringify(statistics)], {
        type: "application/json"
      }))

    let activeFilters = new Filters(filters.filters.filter(filter => filter.active))
    formParams.append('filters',
      new Blob([JSON.stringify(activeFilters)], {
        type: "application/json"
      }))
    formParams.append('searchRequest', searchRequest)

    return new HttpResponseService(this.http.post<number>(`${this.host}${this.port}/api/statistics/${url}`, formParams));
  }

}
