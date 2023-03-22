import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';
import { StoreModel } from '../../store/models/store.model';
import { UserModel } from 'src/app/common/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http:GenericHttpService,

  ) { }

  getAll(model:FilterModel,callBack:(res:ResponseModel<UserModel[]>)=>void){
    this._http.post<ResponseModel<UserModel[]>>("/User/GetAllUser",model,res=>callBack(res));
  }
  sendForgotPassword(model:any,callBack:(res:ResponseModel<string>)=>void) {
    this._http.post<ResponseModel<string>>("/Auth/ForgotPasswordEmail",model,res=>callBack(res));
  }

  getStores(callBack:(res:ResponseModel<StoreModel[]>)=> void) {
    this._http.get<ResponseModel<StoreModel[]>>("/Store/GetAll",res=>callBack(res));
  }
  updateUser(model:UserModel,callBack:(res:ResponseModel<string>)=> void){
    let model2 = {id:model.id,storeId:model.storeId};
    this._http.post<ResponseModel<string>>("/Auth/UpdateUser",model2,res=>callBack(res));
  }
}
