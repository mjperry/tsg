import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

export interface SearchModel {
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  searchModel: SearchModel

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchModel = this.searchService.getSearchModel();
  }

  search() {
    this.searchService.setSearchModel(this.searchModel);
  }

}
