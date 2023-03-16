import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';
import { decrement, increment, reset } from 'src/app/counter.actions';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { HomeService } from './service/home.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { Store } from '@ngrx/store';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count$: Observable<number>  
  categories: CategoryModel[]= [];
  productStores: ProductStoreModel[] = [];
  search:string=""
  constructor(private store: Store<{ count: number }>,
              private _homeService: HomeService,
              private _toastr: ToastrService 
                           
    ) {
      this.count$ = store.select('count');
      store.select("count").subscribe( res => {
        
      })
  }
  ngOnInit(): void {
    this.getAll();
    this.getAllCategories();
  }
  
  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
  getAll(){
    let filterModel: FilterModel = new FilterModel();
    
    this._homeService.getAll(filterModel,res => {
        this.productStores = res.data;      
     });
    
  }

  getAllCategories(){
    this._homeService.getAllCategories(res=>{      
      this.categories = res.data;
    });
  }
  getProductsByCategoryId(category:CategoryModel){
    this._homeService.getProductsByCategoryId(category, res=>{      
      this.productStores = res.data;
    })
  }
  addBasket(productStoreId:string,price:Number){
    // console.log(productStoreId);    
    let user = JSON.parse(localStorage.getItem("user"));
    let userId;
    if(user == null) {
      this._toastr.toast(ToastrType.Error,"Ürün eklemek için giriş yapınız","Hata")
    }else {
      userId = user.userId
    }
    console.log(user);
     this._homeService.checkBasket(userId,productStoreId,price,res =>{
        this._toastr.toast(ToastrType.Success,res.message,"İşlem");
     })
  }
}
