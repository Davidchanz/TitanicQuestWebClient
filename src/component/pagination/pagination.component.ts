import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from "../../model/pagination/Pagination";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationService} from "../../service/pagination/PaginationService";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  pagination?: Array<Pagination>;
  @Input() activePage!: Pagination;
  @Input() url!: string;
  @Input() navigateUrl!: string;
  @Output() pageChanged = new EventEmitter <number>();
  searchRequest: string = '';

  constructor(private router: Router,
              private paginationService: PaginationService,
              private route: ActivatedRoute) {

  }

  getPagination(){
    const param = this.route.snapshot.queryParams['searchRequest'];
    if(param == null)
      this.searchRequest = "";
    else
      this.searchRequest = param;

    this.paginationService.getPagination(this.url, this.searchRequest, this.activePage.number)
      .subscribe(value => {
      this.pagination = value.pagination;
      if(this.pagination.length > 0) {
        if (this.activePage.number > this.pagination[this.pagination.length - 1].number) {
          this.activePage.number = this.pagination[this.pagination.length - 1].number;
          this.router.navigate([this.navigateUrl], {queryParams: {page: this.activePage.number}, queryParamsHandling: 'merge'});
        }
      }
    })
  }

  onNextPage() {
    if(this.activePage.number < this.pagination![this.pagination!.length-1].number)
      this.changePage(++this.activePage.number);
  }

  onPrevPage() {
    if(this.activePage.number > this.pagination![0].number)
      this.changePage(--this.activePage.number);
  }

  onPage(page: number) {
    this.activePage.number = page;
    this.changePage(page);
  }

  changePage(page: number){
    this.activePage.number = page
    this.router.navigate([this.navigateUrl], { queryParams: {page: this.activePage.number}, queryParamsHandling: 'merge' });
    this.pageChanged.emit(page);
    this.getPagination();
  }

  ngOnInit(): void {
    this.getPagination();
    this.route.queryParams.subscribe(value => {
      const searchRequest = this.route.snapshot.queryParams['searchRequest'];
      if(searchRequest != null) {
        this.searchRequest = searchRequest;
        this.getPagination()
      }
    })
  }
}
