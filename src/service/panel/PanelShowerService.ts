import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PanelShowerService {

  showOkPanel(message: string) {
    let okLabel = window.document.getElementById("ok-label");
    okLabel!.style.transform = "translateY(0%)";
    let description = window.document.getElementById("ok-description");
    description!.textContent = message;
    let id = setInterval(() => {
      okLabel!.style.transform = "translateY(-100%)";
      clearInterval(id);
    }, 5000)
  }

  showErrorPanel(errorsDescription: string, hide:boolean){
    let errorLabel = window.document.getElementById("error-label");
    errorLabel!.style.transform = "translateY(0%)";
    let description = window.document.getElementById("error-description");
    description!.textContent = errorsDescription;
    if(hide) {
      let id = setInterval(() => {
        errorLabel!.style.transform = "translateY(-110%)";
        clearInterval(id);
      }, 5000)
    }
  }

}
