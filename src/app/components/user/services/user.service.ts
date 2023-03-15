import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';
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
}
