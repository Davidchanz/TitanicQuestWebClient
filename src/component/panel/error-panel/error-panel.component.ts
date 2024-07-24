import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PanelShowerService} from "../../../service/panel/PanelShowerService";

@Component({
  selector: 'app-error-panel',
  standalone: true,
  imports: [],
  templateUrl: './error-panel.component.html',
  styleUrls: [
    './error-panel.component.css'
  ],
  animations: [
    trigger('error', [
      state('show', style({transform: "translateY(0)"}),),
      state('hide', style({transform: "translateY(-110%)"})),
      transition('show => hide', animate('1s ease')),
      transition('hide => show', animate('1s ease'))
    ])
  ]
})
export class ErrorPanelComponent {
  error: string = 'hide';
  state: {message: string} = {message: ''};

  constructor(private panelShowerService: PanelShowerService) {
    this.panelShowerService.setErrorComponent(this);
  }

  setState(message: string) {
    this.state.message = message;
  }

  hide() {
    this.error = 'hide';
  }

  show() {
    this.error = 'show';
  }
}
