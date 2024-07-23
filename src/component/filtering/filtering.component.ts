import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filters} from "../../model/filter/Filters";
import {FormsModule} from "@angular/forms";
import {Filter} from "../../model/filter/Filter";
import {FilterCheckBox} from "../../model/filter/FilterCheckBox";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.css'
})
export class FilteringComponent implements OnInit, AfterViewInit{
  @Input() filters!: Filters;
  filterCheckBoxes: FilterCheckBox[] = [];
  @Output() filterChanged = new EventEmitter <unknown>();

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParams['filters'];
    let activeFiltersIndexes: string | null;
    if(param == null)
      activeFiltersIndexes = null;
    else
      activeFiltersIndexes = param;

    for (let currentFilter of this.filters.filters) {
      let filterGroup = new Array<Filter>;
      filterGroup.push(currentFilter);
      for (let filter of this.filters.filters){
        if(filter != currentFilter
          && filter.title == currentFilter.title){
          filterGroup.push(filter);
        }
      }
      if(filterGroup.length > 1){
        if(this.filterCheckBoxes.findIndex(value => value.title == filterGroup[0].title) == -1)
          this.filterCheckBoxes.push(new FilterCheckBox(filterGroup, filterGroup[0].title))
      } else {
        if (this.filterCheckBoxes.findIndex(value => value.title == currentFilter.title) == -1)
          this.filterCheckBoxes.push(new FilterCheckBox([currentFilter], currentFilter.title))
      }
    }
    if(activeFiltersIndexes){
      activeFiltersIndexes.split(",").forEach(index => {
        this.filterCheckBoxes[Number.parseInt(index)].active = true;
        this.filterCheckBoxes[Number.parseInt(index)].filters
          .forEach(filter => filter.active = true)
      })
    }
  }

  ngAfterViewInit(): void {
    this.filterChanged.emit();
  }

  setCheck(filterBox: FilterCheckBox) {
    filterBox.filters.forEach(filter => filter.active = filterBox.active)
    let activeFilters = this.filterCheckBoxes
      .filter(value => value.active)
      .map(value => this.filterCheckBoxes.indexOf(value))
      .join(",");
    this.router.navigate([],
      {queryParams: {filters: activeFilters}, queryParamsHandling: 'merge'})
      .then(r =>{
        this.filterChanged.emit();
      });
  }
}
