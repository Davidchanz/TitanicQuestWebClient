import {Environment} from "../../config/Environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

declare let __config: Environment;

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  host: string;
  port: string;

  constructor(protected http: HttpClient) {
    this.host = __config.host;
    this.port = __config.port;
  }
}
