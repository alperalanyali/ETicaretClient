import { Component, OnInit } from '@angular/core';
import { decrement, increment, reset } from 'src/app/counter.actions';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { HomeService } from './service/home.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count$: Observable<number>  
  categories: CategoryModel[]= [];
  productCategories: ProductWithCategories[] = [];
  constructor(private store: Store<{ count: number }>,
              private _homeService: HomeService,              
    ) {
    this.count$ = store.select('count');
  }
  ngOnInit(): void {
    this.getAll();
    this.getAllCategories();
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

  getAllCategories(){
    this._homeService.getAllCategories(res=>{      
      this.categories = res.data;
    });
  }
  getProductsByCategoryId(categoryId:string){
    this._homeService.getProductsByCategoryId(categoryId, res=>{      
      this.productCategories = res.data;
    })
  }
}
