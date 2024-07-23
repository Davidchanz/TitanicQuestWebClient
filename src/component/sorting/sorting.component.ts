import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Sort} from "../../model/sorting/Sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.css'
})
export class SortingComponent{
  @Input() title!: string;
  @Input() by!: string;
  @Input() url!: string;
  @Output() sortChanged = new EventEmitter <unknown>();
  @Input() sort!: Sort;

  constructor(private router: Router) {
  }

  sorting() {
    if(this.sort.by == this.by)
      if(this.sort.order == 'asc')
        this.sort.order = 'desc';
      else
        this.sort.order = 'asc';
    this.sort.by = this.by;

    this.router.navigate([], { queryParams: {sort: this.sort.by, order: this.sort.order}, queryParamsHandling: 'merge' });
    this.sortChanged.emit();
  }
}
