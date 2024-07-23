import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SearchGuess} from "../../model/search/SearchGuess";
import {Router, RouterLink} from "@angular/router";
import {SearchService} from "../../service/search/SearchService";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild("dropdown") dropdown!: ElementRef;
  searchResults: SearchGuess;
  searchRequest: string = "";
  hide: boolean = false;

  constructor(private router: Router,
              private searchService: SearchService){

    this.searchResults = new SearchGuess([]);
  }

  searchType() {
    this.searchRequest = this.searchRequest.trim()
    if(this.searchRequest != '' && !this.searchRequest.includes("/")) {
      this.searchService.getSearchResult(this.searchRequest, this.router.url.split('?')[0])
        .subscribe(searchGuess => {
          this.searchResults.results = searchGuess.results;
        })
    }
    if(this.searchRequest == '') {
      this.searchResults.results = [];
    }
  }

  hideSearch() {
    if(!this.hide){
      this.hide = true;
      let interval = setInterval(()=>{
        this.searchResults.results = [];
        this.dropdown.nativeElement.style.opacity = "1";
        clearInterval(interval)
        this.hide = false;
      }, 150);
      this.dropdown.nativeElement.style.opacity = "0";
    }
  }

  onSearchClick() {
    this.hideSearch()
    this.searchRequest = this.searchRequest.trim()
    if(!this.searchRequest.includes("/"))
      this.router.navigate([this.router.url.split('?')[0]], { queryParams: {searchRequest: this.searchRequest}, queryParamsHandling: 'merge'  });
  }

  onSearchItemClick(searchItem: String) {
    this.searchRequest = searchItem.toString();
    this.onSearchClick();
  }
}
