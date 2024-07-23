import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filters} from "../../model/filter/Filters";
import {FormsModule} from "@angular/forms";
import {Filter} from "../../model/filter/Filter";
import {FilterCheckBox} from "../../model/filter/FilterCheckBox";

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.css'
})
export class FilteringComponent implements OnInit{
  @Input() filters!: Filters;
  filterCheckBoxes: FilterCheckBox[] = [];
  @Output() filterChanged = new EventEmitter <unknown>();

  ngOnInit(): void {
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
  }

  setCheck(filterBox: FilterCheckBox) {
    filterBox.filters.forEach(filter => filter.active = filterBox.active)
    this.filterChanged.emit();
  }
}
