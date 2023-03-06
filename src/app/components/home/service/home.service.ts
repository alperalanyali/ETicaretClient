import { Injectable, OnInit } from '@angular/core';

import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginResponseModel } from 'src/app/common/models/login-response.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService 
 {

  constructor(
      private _http: GenericHttpService
  ) { }

  basket:BasketModel = new BasketModel();

  getAll(model:FilterModel,callBack: (res:ResponseModel<ProductWithCategories[]>)=>void){
    
    this._http.post<ResponseModel<ProductWithCategories[]>>("/Product/GetAllProducts",model,res => callBack(res))
  }
  getAllCategories(callBack:(res:ResponseModel<CategoryModel[]>)=> void){
    this._http.get<ResponseModel<CategoryModel[]>>("/Category/GetAll",res =>{
      callBack(res);
    })
  }
  getProductsByCategoryId(categoryId:string,callBack:(res:ResponseModel<ProductWithCategories[]>)=> void){
    debugger;
    let model ={categoryId:categoryId}
    if(categoryId.toUpperCase() ==="0A2E737F-0C81-41ED-BD0C-9A02A8F16F1E"){
      this._http.post<ResponseModel<ProductWithCategories[]>>("/Product/GetAllProducts",model,res => callBack(res));
    }else {
      this._http.post<ResponseModel<ProductWithCategories[]>>("/Product/GetProductsByCategoryId",model,res=>callBack(res));  
    }
  }

  checkBasket(userId:string,productId:string,price:number,callBack:(res:ResponseModel<string>)=> void){       
        let basket:{userId:string,totalAmount:number}   ={
          userId:userId,
          totalAmount:0          
        };
     
        this.getLastBasketIdByUserId(userId,res1 =>{
          
          console.log(res1)
          this.basket = res1.data;
          if(this.basket == null){
            this._http.post<ResponseModel<string>>("/Basket/Create",basket,res2=>{
              
            })
          }else {
            let productInsideBasket=this.basket.basketItems.find(item => item.productId == productId);
            if(productInsideBasket == undefined) {
                let model:BasketItemModel = new BasketItemModel();
                model.basketId = this.basket.id;
                model.productId = productId;
                model.quantity = 1;
                model.totalPrice = model.quantity * price;
                this.addBasket(model,res => {
                  callBack(res);
                })
            }else {
              console.log(productInsideBasket);
              productInsideBasket.quantity++;
              productInsideBasket.totalPrice = productInsideBasket.product.price * productInsideBasket.quantity;
              this.updateBasket(productInsideBasket,res =>{
                  callBack(res);
              });
            }
          }
            
        })
       
   
  }

  getLastBasketIdByUserId(userId:string,callBack:(res:ResponseModel<BasketModel>)=> void){
    
    let model:{userId:string} = {userId:userId}
    
    this._http.post<ResponseModel<BasketModel>>("/Basket/GetBasketIdByUserId",model,res=>{        
        callBack(res);
    })
  }
  

  addBasket(baskItem:BasketItemModel,callBack: (res:ResponseModel<string>)=> void){
      this._http.post<ResponseModel<string>>("/BasketItem/Create",baskItem,res=>{
          callBack(res);
      })
  }

  updateBasket(basketItem:BasketItemModel,callBack:(res:ResponseModel<string>)=>void){
      this._http.post<ResponseModel<string>>("/BasketItem/Update",basketItem,res=>{
        callBack(res);
      })
  }

  
}
