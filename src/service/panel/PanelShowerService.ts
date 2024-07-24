import {Injectable} from "@angular/core";
import {OkPanelComponent} from "../../component/panel/ok-panel/ok-panel.component";
import {ErrorPanelComponent} from "../../component/panel/error-panel/error-panel.component";

@Injectable({
  providedIn: "root",
})
export class PanelShowerService {
  okPanelComponent!: OkPanelComponent
  errorPanelComponent!: ErrorPanelComponent;

  setOkComponent(okPanelComponent: OkPanelComponent){
    this.okPanelComponent = okPanelComponent;
  }

  setErrorComponent(errorPanelComponent: ErrorPanelComponent){
    this.errorPanelComponent = errorPanelComponent;
  }

  showOkPanel(message: string) {
    this.okPanelComponent.setState('', message)
    this.okPanelComponent.show();

    let id = setInterval(() => {
      this.okPanelComponent.hide();
      clearInterval(id);
    }, 5000)
  }

  showErrorPanel(errorsDescription: string, hide:boolean){
    this.errorPanelComponent.setState(errorsDescription)
    this.errorPanelComponent.show();
    if(hide) {
      let id = setInterval(() => {
        this.errorPanelComponent.hide();
        clearInterval(id);
      }, 5000)
    }
  }

}
