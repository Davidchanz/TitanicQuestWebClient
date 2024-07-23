import { Component } from '@angular/core';
import {Passengers} from "../../model/passenger/Passengers";
import {PassengerService} from "../../service/passenger/PassengerService";

@Component({
  selector: 'app-titanic-quest',
  standalone: true,
  imports: [],
  templateUrl: './titanic-quest.component.html',
  styleUrl: './titanic-quest.component.css'
})
export class TitanicQuestComponent {
  passengers?: Passengers

  constructor(private passengerService: PassengerService) {
    this.passengerService.getPassengers(1, 50, "id", "ASC", "")
      .subscribe(value => {
        this.passengers = value;
      })
  }
}
