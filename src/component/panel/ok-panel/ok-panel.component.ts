import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {PanelShowerService} from "../../../service/panel/PanelShowerService";

@Component({
  selector: 'app-ok-panel',
  standalone: true,
  imports: [],
  templateUrl: './ok-panel.component.html',
  styleUrls: [
    './ok-panel.component.css'
  ],
  animations: [
    trigger('ok', [
      state('show', style({transform: "translateY(0)"}),),
      state('hide', style({transform: "translateY(-110%)"})),
      transition('show => hide', animate('1s ease')),
      transition('hide => show', animate('1s ease'))
    ])
  ]
})
export class OkPanelComponent {
  ok: string = 'hide';
  state: {title: string, message: string} = {title: '', message: ''};

  constructor(private panelShowerService: PanelShowerService) {
    this.panelShowerService.setOkComponent(this);
  }

  setState(title: string, message: string) {
    this.state.title = title;
    this.state.message = message;
  }

  show() {
    this.ok = 'show';
  }

  hide() {
    this.ok = 'hide';
  }
}
