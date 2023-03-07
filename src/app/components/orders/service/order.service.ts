import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { OrderModel } from 'src/app/common/models/order.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private _http:GenericHttpService
  ) { }
  

  getOrdersByUserId(callBack:(res:ResponseModel<OrderModel[]>)=> void){
    let user = JSON.parse(localStorage.getItem("user"));
    let model:{userId:string} = {userId:user.userId};

    this._http.post<ResponseModel<OrderModel[]>>("/Order/GetOrdersByUserId",model,res=>{
      callBack(res);
    })
  }
}
