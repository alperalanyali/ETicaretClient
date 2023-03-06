import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { LoginRequestModel } from 'src/app/common/models/login-request.model';
import { LoginResponseModel } from 'src/app/common/models/login-response.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http:GenericHttpService
  ) { }

  login(model:LoginRequestModel,callBack:(res:ResponseModel<LoginResponseModel>)=> void){
    
    this._http.post<ResponseModel<LoginResponseModel>>("/Auth/Login",model,res=>{
      callBack(res);
    })
  }
}
