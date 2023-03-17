import { Injectable, OnInit } from '@angular/core';

import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from 'src/app/common/models/login-response.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _http: GenericHttpService) {}

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

  checkBasket(
    userId: string,
    productStoreId: string,
    price: Number,
    callBack: (res: ResponseModel<string>) => void
  ) {
    debugger;
    let basket: { userId: string; totalAmount: Number } = {
      userId: userId,
      totalAmount: 0,
    };

    this.getLastBasketIdByUserId(userId, (res1) => {
      console.log(res1);
    
      this.basket = res1.data;
      if (this.basket == null) {
        this._http.post<ResponseModel<string>>(
          '/Basket/Create',
          basket,
          (res2) => {
            debugger;
            console.log(res2);
          }
        );
      } else {
        let productInsideBasket = this.basket.basketItems.find(
          (item) => item.productStoreId == productStoreId
        );
        if (productInsideBasket == undefined) {
          let model: BasketItemModel = new BasketItemModel();
          model.basketId = this.basket.id;
          model.productStoreId = productStoreId;
          model.quantity = 1;
          model.totalPrice = model.quantity * +price;
          this.addBasket(model, (res) => {
            callBack(res);
          });
        } else {
          console.log(productInsideBasket);
          productInsideBasket.quantity++;
          productInsideBasket.totalPrice =
            +productInsideBasket.productStore.price *
            productInsideBasket.quantity;
          this.updateBasket(productInsideBasket, (res) => {
            callBack(res);
          });
        }
      }
    });
  }

  getLastBasketIdByUserId(
    userId: string,
    callBack: (res: ResponseModel<BasketModel>) => void
  ) {
    debugger;
    let model: { userId: string } = { userId: userId };

    this._http.post<ResponseModel<BasketModel>>(
      '/Basket/GetBasketIdByUserId',
      model,
      (res) => {
        callBack(res);
      }
    );
  }

  addBasket(
    baskItem: BasketItemModel,
    callBack: (res: ResponseModel<string>) => void
  ) {
    this._http.post<ResponseModel<string>>(
      '/BasketItem/Create',
      baskItem,
      (res) => {
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
