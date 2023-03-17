import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { LoginRequestModel } from 'src/app/common/models/login-request.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth$:Observable<boolean>
  
constructor(
      private _router: Router,
      private store:Store<{auth:boolean}>,
      private _authService:AuthService,
      private _toastr:Toastr2Service
  ){
  this.auth$ = store.select('auth');
}

  loginRequest: LoginRequestModel = new LoginRequestModel();
  login(){
    console.log(this.loginRequest);
    this._authService.login(this.loginRequest,res=>{
      if(res.isSuccess){        
        this._toastr.toast(ToastrType.Success,"Hoşgeldiniz","Başarılı",ToastrPosition.BottomRight);
        this._router.navigateByUrl("/");        
        const userJson = JSON.stringify(res); 
  
        localStorage.setItem("user",userJson);
      }else {
        this._toastr.toast(ToastrType.Error,res.message,"Giriş İşlemi",ToastrPosition.BottomLeft)
      }
    })
      // this._router.navigateByUrl("/")
  }

  sendForgotPassword(form:NgForm){
    if(form.valid){
      let userOrEmail = form.controls["emailOrUsernameForgotPassword"].value;
      let model = {emailOrUsername:userOrEmail}
      this._authService.sendForgotPassword(model,res=>{
        this._toastr.toast(ToastrType.Info,res.message,"Bilgilendirme");
      })
    }
  }

  sendConfirmEmail(form:NgForm){
    if(form.valid){
      let emailOrUsername = form.controls["emailOrUsernameConfirmEmail"].value;
      let model = {emailOrUsername:emailOrUsername};
      this._authService.sendConfirmEmail(model,res=>{
          this._toastr.toast(ToastrType.Info,"toast-bottom-right",res.message);
      });
    }
  }
  showOrHidePassword(password: HTMLInputElement) {
    if (password.type == "password")
      password.type = "text"
    else {
      password.type = "password"
    }
  }
}
