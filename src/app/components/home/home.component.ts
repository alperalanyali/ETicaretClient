import { Component, OnInit } from '@angular/core';
import { decrement, increment, reset } from 'src/app/counter.actions';

import { FilterModel } from 'src/app/common/models/filter.model';
import { HomeService } from './service/home.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count$: Observable<number>  
  
  productCategories: ProductCategoryModel[] = [];
  constructor(private store: Store<{ count: number }>,
              private _homeService: HomeService,
              private _http:HttpClient
    ) {
    this.count$ = store.select('count');
  }
  ngOnInit(): void {
    this.getAll();
  }
  
  increment(){
    
    
    this.store.dispatch(increment());
  }
  decrement(){
    
    this.store.dispatch(decrement());
  }
  reset (){
    
    this.store.dispatch(reset());
  }

  getAll(){
    let filterModel: FilterModel = new FilterModel();
    
    this._homeService.getAll(filterModel,res => {
        this.productCategories = res.data;
        console.log(this.productCategories)
     });
    
  }
}
