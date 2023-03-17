import { Component, OnInit } from '@angular/core';
import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AuthService } from '../services/auth.service';
import { LoginRequestModel } from 'src/app/common/models/login-request.model';
import { NgForm } from '@angular/forms';
import { RegisterModel } from 'src/app/common/models/register.model';
import { RoleModel } from 'src/app/common/models/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel:RegisterModel= new RegisterModel();
  roles:RoleModel[] = [];
  constructor(
    
    private _authService :AuthService,
    private _toastr: Toastr2Service,
    private _router: Router
  ){
    
  }
  ngOnInit(): void {
    this.getRoles();
  }
  showOrHidePassword(password: HTMLInputElement) {
    if (password.type == "password")
      password.type = "text"
    else {
      password.type = "password"
    }
  }
  register(form:NgForm){
    this._authService.register(this.registerModel,res=>{
      if(res.isSuccess){
        this._toastr.toast(ToastrType.Success,res.message,"İşlem",ToastrPosition.BottomCenter);
        let emailOrUsername = form.controls["email"].value;
        let model = {emailOrUsername:emailOrUsername};
        this._authService.sendConfirmEmail(model,res=>{
          this._router.navigateByUrl('/login');
            this._toastr.toast(ToastrType.Info,res.message,"Başarılı",ToastrPosition.BottomCenter);
        });         
      }
      
    })
  }

  getRoles(){
    this._authService.getRoles(res=>{
      this.roles = res.data;
    })
  }
}
