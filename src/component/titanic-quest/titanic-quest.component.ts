import {Component, ViewChild} from '@angular/core';
import {Passengers} from "../../model/passenger/Passengers";
import {PassengerService} from "../../service/passenger/PassengerService";
import {PaginationComponent} from "../pagination/pagination.component";
import {ActivatedRoute} from "@angular/router";
import {SortPageSearchBasic} from "../SortPageSearchBasic";
import {SortingComponent} from "../sorting/sorting.component";
import {Filters} from "../../model/filter/Filters";
import {FilteringComponent} from "../filtering/filtering.component";
import {Filter} from "../../model/filter/Filter";

@Component({
  selector: 'app-titanic-quest',
  standalone: true,
  imports: [
    PaginationComponent,
    SortingComponent,
    FilteringComponent
  ],
  templateUrl: './titanic-quest.component.html',
  styleUrl: './titanic-quest.component.css'
})
export class TitanicQuestComponent extends SortPageSearchBasic{
  passengers?: Passengers
  filters: Filters;

  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;

  constructor(private passengerService: PassengerService,
              public override route: ActivatedRoute) {
    super(route)

    this.filters = new Filters([
      new Filter('survived', '=', 'true', 'AND', 'Survived Passengers'),
      new Filter('age', '>', '16.0', 'AND', 'Adult Passengers'),
      new Filter('sex', '=', "'male'", 'AND', 'Mens'),
      new Filter('siblingsSpouses', '=', '0', 'AND', 'Passengers who have no relatives'),
      new Filter('parentsChildren', '=', '0', 'AND', 'Passengers who have no relatives'),
    ]);

    // hard coded filters there is opportunity read them from file or from server if it will be required in future

  }

  getItems(){
    this.passengerService.getPassengers(this.pagination, 50, this.sorting,
      this.searchRequest, this.filters)
      .subscribe(value => {
        this.passengers = value
      })
  }

  filtering() {
    this.paginationComponent.getPagination()
  }
}
