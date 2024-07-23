import {Observable, Subscription, TimeoutError} from "rxjs";
import {Directive} from "@angular/core";
import {ApiError} from "../../model/error/ApiError";
import {Router} from "@angular/router";
import {injector} from "../../config/Injector";
import {PanelShowerService} from "../panel/PanelShowerService";

@Directive()
export class HttpResponseService<T>{

  constructor(private observable: Observable<T>) {
  }

  subscribe(observerOrNext: ((value: T) => void), errorNext?: (err: any) => void): Subscription {

    return this.observable.subscribe({next: observerOrNext, error: (err)=>{
        let router = injector().get(Router);
        let panelShower = injector().get(PanelShowerService);
        if(errorNext != null){
          errorNext(err)
        }
        if(err instanceof TimeoutError){
          panelShower.showErrorPanel("Timeout has occurred, try again later.", false)
          return;
        }
        if(err.status == 0){
          panelShower.showErrorPanel("Server is temporarily unavailable", false)
          return
        }
        let error = <ApiError>err.error;
        panelShower.showErrorPanel(this.getErrorDescriptions(error), true)
      }
    })
  }

  private getErrorDescriptions(error: ApiError): string{
    let errorsDescription = "";
    for (let er of error.errors) {
      errorsDescription += er.description + "\n";
    }
    return errorsDescription;
  }
}
