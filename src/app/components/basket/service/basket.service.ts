import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private _http:GenericHttpService
    ) { }

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
    
}
