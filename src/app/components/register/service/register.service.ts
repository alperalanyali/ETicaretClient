import { AuthService } from '../../login/auth/auth.service';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { RegisterModel } from 'src/app/common/models/register.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { RoleModel } from 'src/app/common/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private _httpService :GenericHttpService,

  ) { }

  register(registerModel:RegisterModel,callBack:(res:ResponseModel<string>)=>void) {
    this._httpService.post<ResponseModel<string>>("/Auth/CreateUser",registerModel,res=>callBack(res));
  }
  getRoles(callBack:(res:ResponseModel<RoleModel[]>)=>void) {
      this._httpService.get<ResponseModel<RoleModel[]>>("/Role/GetAll",res=>callBack(res));
  }
}
