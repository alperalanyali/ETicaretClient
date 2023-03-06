import { Injectable, OnInit } from '@angular/core';

import { AddressModel } from 'src/app/common/models/address.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UserModel } from 'src/app/common/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService  {

 
  constructor(
    private _http:GenericHttpService
  ) { }
  

  getUserById(userId:string,callBack:(res:ResponseModel<UserModel>)=> void){
    let model:{userId:string}={userId:userId};
    this._http.post<ResponseModel<UserModel>>("/Auth/GetUserById",model,res=>{
      callBack(res);
    })
  }

  getAddressesByUserId(userId:string,callBack:(res:ResponseModel<AddressModel[]>)=>void) {
    
    let model:{userId:string}={userId:userId};
    this._http.post<ResponseModel<AddressModel[]>>("/Address/GetAddressByUserId",model,res =>{
      callBack(res);
    })
  }

  addNewAddress(model:AddressModel,callBack:(res:ResponseModel<string>)=> void){
      
    this._http.post<ResponseModel<string>>("Address/Create",model,res=>{
      console.log(res);
      callBack(res);
    })
  }
}
