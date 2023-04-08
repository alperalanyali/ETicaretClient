import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from 'src/app/common/models/login-request.model';
import { LoginResponseModel } from 'src/app/common/models/login-response.model';
import { RegisterModel } from 'src/app/common/models/register.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { RoleModel } from 'src/app/common/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpService :GenericHttpService,

  ) { }


  login(model:LoginRequestModel,callBack:(res:ResponseModel<LoginResponseModel>)=> void){
    
    this._httpService.post<ResponseModel<LoginResponseModel>>("/Auth/Login",model,res=>{
      callBack(res);
    })
  }
  register(registerModel:RegisterModel,callBack:(res:ResponseModel<string>)=>void) {
    registerModel.storeId = '8A81CB18-2947-4F8F-B7B6-FBA44C8EFE67';
    this._httpService.post<ResponseModel<string>>("/Auth/CreateUser",registerModel,res=>{callBack(res)
      
    });
  }
  getRoles(callBack:(res:ResponseModel<RoleModel[]>)=>void) {
      this._httpService.get<ResponseModel<RoleModel[]>>("/Role/GetAll",res=>callBack(res));
  }

  sendForgotPassword(model:any,callBack:(res:ResponseModel<string>)=>void) {
    this._httpService.post<ResponseModel<string>>("/Auth/ForgotPasswordEmail",model,res=>callBack(res));
  }

  refreshPassword(model:any,callBack:(res:ResponseModel<string>)=>void) {

    this._httpService.post<ResponseModel<string>>("/Auth/RefreshPassword",model,res=>callBack(res));
  }

  sendConfirmEmail(model:any,callBack:(res:ResponseModel<string>)=>void) {
      this._httpService.post<ResponseModel<string>>("/Auth/SendConfirmEmail",model,res=>callBack(res));

  }
  confirmMail(code:string,callBack:(res:ResponseModel<string>)=>void) {
    let model = {code:code};
    debugger;
    this._httpService.post<ResponseModel<string>>("/Auth/ConfirmEMail",model,res=>callBack(res));
  }
}
