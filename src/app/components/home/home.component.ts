import { Component, OnInit } from '@angular/core';
import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';
import { decrement, increment, reset } from 'src/app/counter.actions';

import { BasketService } from '../basket/service/basket.service';
import { CategoryModel } from 'src/app/common/models/category.model';
import { CreateBasketRequest } from './models/create-basket-request';
import { FilterModel } from 'src/app/common/models/filter.model';
import { HomeService } from './service/home.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
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
  selectedProductStore: ProductStoreModel = new ProductStoreModel();
  search:string=""
  constructor(private store: Store<{ count: number }>,
              private _homeService: HomeService,
              private _basketService: BasketService,
              private _toastr: ToastrService,
              private _toastr2Service: Toastr2Service,
                           
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
        if(res.data != null) 
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
  addBasket(form:NgForm){
    // console.log(productStoreId);    
    let user = JSON.parse(localStorage.getItem("user"));
    let userId;
    if(user == null) {
      this._toastr.toast(ToastrType.Error,"Ürün eklemek için giriş yapınız","Hata")
    }else {
      userId = user.userId
    }    
    let model: CreateBasketRequest =  new CreateBasketRequest();
    model.userId = userId;
    model.productStoreId = this.selectedProductStore.id;
    model.quantity = 1;
    model.totalPrice = this.selectedProductStore.price ;
 
     this._homeService.checkBasket(model,res =>{     
        this._toastr2Service.toast(ToastrType.Success,res.message,"Başarılı",ToastrPosition.BottomRight );       
     })
  }

  get(productStore:ProductStoreModel){
    this.selectedProductStore = productStore;
    
  }
}
