import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    value = '';
  constructor() { }

  public searchValue(value : string){
    this.value = value
  }

  public search(){
    return this.value
  }
}
