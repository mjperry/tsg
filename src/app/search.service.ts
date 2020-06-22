import { Injectable } from '@angular/core';
import { SearchModel } from './search-form/search-form.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchModel: SearchModel;

  constructor() {
    this.searchModel = {} as SearchModel;
    this.searchModel.address = '123 ABC Street';
    this.searchModel.email = 'blah@gmail.com';
    this.searchModel.name = 'Michael Perry';
    this.searchModel.phone = '111-2222';
   }

   public getSearchModel(): SearchModel {
    return this.searchModel;
   }

   public setSearchModel(searchModel: SearchModel): void {
    this.searchModel = searchModel;
  }
}
