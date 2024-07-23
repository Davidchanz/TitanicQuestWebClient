import { Component } from '@angular/core';
import {Passengers} from "../../model/passenger/Passengers";
import {PassengerService} from "../../service/passenger/PassengerService";
import {PaginationComponent} from "../pagination/pagination.component";
import {Pagination} from "../../model/pagination/Pagination";
import {ActivatedRoute} from "@angular/router";
import {SortPageSearchBasic} from "../SortPageSearchBasic";
import {SortingComponent} from "../sorting/sorting.component";

@Component({
  selector: 'app-titanic-quest',
  standalone: true,
  imports: [
    PaginationComponent,
    SortingComponent
  ],
  templateUrl: './titanic-quest.component.html',
  styleUrl: './titanic-quest.component.css'
})
export class TitanicQuestComponent extends SortPageSearchBasic{
  passengers?: Passengers

  constructor(private passengerService: PassengerService,
              public override route: ActivatedRoute) {
    super(route)

    this.getItems()
  }

  getItems(){
    this.passengerService.getPassengers(this.pagination, 50, this.sorting, this.searchRequest)
      .subscribe(value => {
        this.passengers = value
      })
  }
}
