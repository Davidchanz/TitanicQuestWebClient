import {Component, Input, OnInit} from '@angular/core';
import {StatisticService} from "../../service/statistic/StatisticService";
import {Filters} from "../../model/filter/Filters";
import {Statistic} from "../../model/statistic/Statistic";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit{
  @Input() statistic!: Statistic;
  @Input() filters!: Filters;
  @Input({required: true}) url!: string;
  statisticResult: number = 0;
  searchRequest: string = '';

  constructor(private statisticService: StatisticService,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getStatistic();
  }

  public getStatistic() {
    const param = this.route.snapshot.queryParams['searchRequest'];
    if(param == null)
      this.searchRequest = "";
    else
      this.searchRequest = param;

    this.statisticService.getStatistic(this.url, this.statistic, this.filters, this.searchRequest)
      .subscribe(value => {
        this.statisticResult = value;
      })
  }
}
