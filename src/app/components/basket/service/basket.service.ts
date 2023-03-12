import { AddressModel } from 'src/app/common/models/address.model';
import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/common/models/order.model';
import { PaymentTypeModel } from 'src/app/common/models/payment-type.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private _http:GenericHttpService
    ) { }

    basket :BasketModel = new BasketModel();
    order: OrderModel = new OrderModel();
    getLastBasketIdByUserId(userId:string,callBack:(res:ResponseModel<BasketModel>)=> void){
    
      let model:{userId:string} = {userId:userId}
      
      this._http.post<ResponseModel<BasketModel>>("/Basket/GetBasketIdByUserId",model,res=>{        
          callBack(res);                    
      })
    }

    updateBasketItem(model:BasketItemModel,callBack:(res:ResponseModel<string>)=>void){
      this._http.post<ResponseModel<string>>("/BasketItem/Update",model,res => {
        callBack(res);
      })
    }

    deleteBasketItem(id:string,callBack:(res:ResponseModel<string>)=>void){
      let model:{id:string} = {id:id};
      this._http.post<ResponseModel<string>>("/BasketItem/Delete",model,res=>{
          callBack(res);
      })
    }
    getAddressesByUserId(userId:string,callBack:(res:ResponseModel<AddressModel[]>)=>void) {
    
      let model:{userId:string}={userId:userId};
      this._http.post<ResponseModel<AddressModel[]>>("/Address/GetAddressByUserId",model,res =>{
        callBack(res);
      })
    }

    getPaymentType(callBack:(res:ResponseModel<PaymentTypeModel[]>)=>void){
      this._http.get<ResponseModel<PaymentTypeModel[]>>("/PaymentType/GetAllPaymentType",res=>{
        callBack(res);
      })
    }
    createOrder(order:OrderModel,basket:BasketModel,callBack:(res:ResponseModel<string>)=>void){
            debugger;
      this._http.post<ResponseModel<string>>("/Order/Create",order,res=>{
          callBack(res);     
          this.getLastOrderByUserId(order.userId,res=>{
             let orderId = res.data.id;
             this.createOrderItems(orderId,basket.basketItems,res=>{
                callBack(res);
                debugger;
                this.deleteBasketId(basket.id,res=>{
                  console.log(res);
                })
             });
          });    
      });
    }
    getLastOrderByUserId(userId:string,callBack:(res:ResponseModel<OrderModel>)=> void){
      let model:{userId:string} = {userId:userId};
      this._http.post<ResponseModel<OrderModel>>("/Order/GetLastOrderByUserId",model,res=>{
        callBack(res);
        
      })
    }

    deleteBasketId(basketId:string,callBack:(res:ResponseModel<string>)=>void){
      let model:{id:string}={id:basketId};
      this._http.post<ResponseModel<string>>("/Basket/Delete",model,res=>{
        callBack(res);
      })
    }
    createOrderItems(orderId:string,basketItems:BasketItemModel[],callBack:(res:ResponseModel<string>)=>void) {
      let model:{orderId:string,basketItems:BasketItemModel[]} = {orderId:orderId,basketItems:basketItems}
      this._http.post<ResponseModel<string>>("/OrderItem/CreateOrderItemsWithBasketItems",model,res=>{            
            callBack(res);
      })
    }
}
