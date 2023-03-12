import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AuthService } from '../login/auth/auth.service';
import { LoginRequestModel } from 'src/app/common/models/login-request.model';
import { NgForm } from '@angular/forms';
import { RegisterModel } from 'src/app/common/models/register.model';
import { RegisterService } from './service/register.service';
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
    private _registerService: RegisterService,
    private _authService :AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ){
    
  }
  ngOnInit(): void {
    this.getRoles();
  }
  
  register(){
    this._registerService.register(this.registerModel,res=>{
      if(res.isSuccess){
        this._toastr.toast(ToastrType.Success,res.message,"İşlem")
        let loginRequestModel:LoginRequestModel = new LoginRequestModel();
        loginRequestModel.emailOrUsername = this.registerModel.email;
        loginRequestModel.password = this.registerModel.password;
        this._authService.login(loginRequestModel,res=>{
          this._router.navigateByUrl("/");   
        })  
      }
      
    })
  }

  getRoles(){
    this._registerService.getRoles(res=>{
      this.roles = res.data;
    })
  }
}
