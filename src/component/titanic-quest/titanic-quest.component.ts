import { Component } from '@angular/core';
import {Passengers} from "../../model/passenger/Passengers";
import {PassengerService} from "../../service/passenger/PassengerService";
import {PaginationComponent} from "../pagination/pagination.component";
import {Pagination} from "../../model/pagination/Pagination";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-titanic-quest',
  standalone: true,
  imports: [
    PaginationComponent
  ],
  templateUrl: './titanic-quest.component.html',
  styleUrl: './titanic-quest.component.css'
})
export class TitanicQuestComponent {
  passengers?: Passengers
  pagination: Pagination

  constructor(private passengerService: PassengerService,
              public route: ActivatedRoute) {
    const page = this.route.snapshot.queryParams['page'];
    if(page == null)
      this.pagination = new Pagination(1);
    else
      this.pagination = new Pagination(page);

    this.getPassengers()
  }

  getPassengers(){
    this.passengerService.getPassengers(this.pagination.number, 50, "id", "ASC", "")
      .subscribe(value => {
        this.passengers = value
      })
  }
}
