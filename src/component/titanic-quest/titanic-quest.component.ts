import {Component, ViewChild, ViewChildren} from '@angular/core';
import {Passengers} from "../../model/passenger/Passengers";
import {PassengerService} from "../../service/passenger/PassengerService";
import {PaginationComponent} from "../pagination/pagination.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SortPageSearchBasic} from "../SortPageSearchBasic";
import {SortingComponent} from "../sorting/sorting.component";
import {Filters} from "../../model/filter/Filters";
import {FilteringComponent} from "../filtering/filtering.component";
import {Filter} from "../../model/filter/Filter";
import {Statistic} from "../../model/statistic/Statistic";
import {Statistics} from "../../model/statistic/Statisctics";
import {StatisticComponent} from "../statistic/statistic.component";
import {FormsModule} from "@angular/forms";
import {NumberSpinEditDirective} from "../../directives/number-spin-edit.directive";

@Component({
  selector: 'app-titanic-quest',
  standalone: true,
  imports: [
    PaginationComponent,
    SortingComponent,
    FilteringComponent,
    StatisticComponent,
    FormsModule,
    NumberSpinEditDirective
  ],
  templateUrl: './titanic-quest.component.html',
  styleUrl: './titanic-quest.component.css'
})
export class TitanicQuestComponent extends SortPageSearchBasic {
  passengers?: Passengers
  filters: Filters;
  statistics: Statistics;
  pageSize: number = 50;

  @ViewChild(PaginationComponent) paginationComponent!: PaginationComponent;
  @ViewChildren(StatisticComponent) statisticComponents!: Array<StatisticComponent>;

  constructor(private passengerService: PassengerService,
              public override route: ActivatedRoute,
              private router: Router) {
    super(route)

    this.filters = new Filters([
      new Filter('survived', '=', 'true', 'AND', 'Survived Passengers'),
      new Filter('age', '>', '16.0', 'AND', 'Adult Passengers'),
      new Filter('sex', '=', "'male'", 'AND', 'Mens'),
      new Filter('siblingsSpouses', '=', '0', 'AND', 'Passengers who have no relatives'),
      new Filter('parentsChildren', '=', '0', 'AND', 'Passengers who have no relatives'),
    ]);

    this.statistics = new Statistics([
      new Statistic("SUM", "fare", [], "Total fare amount"),
      new Statistic("COUNT", "*", [
        new Filter('siblingsSpouses', '>', '0', 'OR'),
        new Filter('parentsChildren', '>', '0', 'OR'),
      ], "Number of people with relatives"),
      new Statistic("COUNT", "*", [
        new Filter('survived', '=', 'true', 'AND'),
      ], "Number of survivors on board"),
    ])

    // hard coded filters and statistics there is opportunity read them from file or from server if it will be required in future

    this.getItems()

  }

  getItems(){
    this.passengerService.getPassengers(this.pagination, this.pageSize, this.sorting,
      this.searchRequest, this.filters)
      .subscribe(value => {
        this.passengers = value
        this.statisticComponents.forEach(statistic => statistic.getStatistic())
      })
  }

  filtering() {
    this.paginationComponent.getPagination(() => {
      this.getItems()
    })
  }

  changePageSize() {
    this.router.navigate([], {skipLocationChange: true,
      queryParams: {pageSize: this.pageSize},
      queryParamsHandling: "merge"
    })
  }
}
