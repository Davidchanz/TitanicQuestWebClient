import {Injectable} from "@angular/core";
import {HttpRequestService} from "../http/HttpRequestService";
import {HttpResponseService} from "../http/HttpResponseService";
import {SearchGuess} from "../../model/search/SearchGuess";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpRequestService{

  getSearchResult(searchInput: String, url: string){
    return new HttpResponseService(this.http.get<SearchGuess>(`${this.host}${this.port}/api/search${url}/guess/${searchInput}`));
  }
}
