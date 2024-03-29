import { Injectable, OnInit } from '@angular/core';

import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { BasketService } from '../../basket/service/basket.service';
import { CategoryModel } from 'src/app/common/models/category.model';
import { CreateBasketRequest } from '../models/create-basket-request';
import { CreateBasketResponse } from '../models/create-basket-response';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from 'src/app/common/models/login-response.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
            private _http: GenericHttpService,
            private _basketService: BasketService
    ) {}

  basket: BasketModel = new BasketModel();

  getAll(
    model: FilterModel,
    callBack: (res: ResponseModel<ProductStoreModel[]>) => void
  ) {
    this._http.post<ResponseModel<ProductStoreModel[]>>(
      '/ProductStore/GetAll',model,
      (res) => callBack(res)
    );
  }
  getAllCategories(callBack: (res: ResponseModel<CategoryModel[]>) => void) {
    this._http.get<ResponseModel<CategoryModel[]>>(
      '/Category/GetAll',
      (res) => {
        callBack(res);
      }
    );
  }
  getProductsByCategoryId(
    category: CategoryModel,
    callBack: (res: ResponseModel<ProductStoreModel[]>) => void
  ) {
    let filterModel:FilterModel = new FilterModel()
    console.log(category)    
    let model = { categoryId: category.id };
    if (category.code.toLocaleLowerCase() === 'all') {
      this._http.post<ResponseModel<ProductStoreModel[]>>(
        '/ProductStore/GetAll',filterModel,
        (res) => callBack(res)
      );
    } else {
      this._http.post<ResponseModel<ProductStoreModel[]>>(
        '/ProductStore/GetProductStoresByCategoryId',
        model,
        (res) => callBack(res)
      );
    }
  }

  async checkBasket(
    model:CreateBasketRequest,
    callBack: (res: CreateBasketResponse) => void
  ) {    
         
      await this._http.post<CreateBasketResponse>(
        '/Basket/Create',
        model,
        (res2)=> {                     
              callBack(res2);  
              this._basketService.basketCount = res2.basketCount;             
              
        }
      );    
  }

  getLastBasketIdByUserId(
    userId: string,
    callBack: (res: ResponseModel<string>) => void
  ) {
    
    let model: { userId: string } = { userId: userId };

    this._http.post<ResponseModel<string>>(
      '/Basket/GetBasketIdByUserId',
      model,
      (res) => {
        callBack(res);
        console.log(res);
      }
    );
  }

  addBasket(
    baskItem: BasketItemModel,
    callBack: (res: ResponseModel<string>) => void
  ) {
    debugger;
    this._http.post<ResponseModel<string>>(
      '/BasketItem/Create',
      baskItem,
      (res) => {
        debugger;
        callBack(res);
      }
    );
  }

  updateBasket(
    basketItem: BasketItemModel,
    callBack: (res: ResponseModel<string>) => void
  ) {
    this._http.post<ResponseModel<string>>(
      '/BasketItem/Update',
      basketItem,
      (res) => {
        callBack(res);
      }
    );
  }
}
