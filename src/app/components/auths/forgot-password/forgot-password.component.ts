import { ActivatedRoute, Router } from '@angular/router';
import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  id :string = "";
  codeText:string = "";

constructor(
  private _authService: AuthService,
  private _activated: ActivatedRoute,
  private _router: Router,
  private _toastr: Toastr2Service

){
  this._activated.params.subscribe(res =>{    
    if (res["id"] != null && res["id"] != undefined) {
        this.id = res["id"];
      if(res["code"] != null && res["code"] != undefined){
        this.codeText = res["code"];
      }
    } else {
      this._router.navigateByUrl("/login");
    }
  });

}

showOrHidePassword(password: HTMLInputElement) {
  if (password.type == "password")
    password.type = "text"
  else {
    password.type = "password"
  }
}

refeshPassword(form: NgForm) {
  console.log(form.valid)
  if (form.valid) {
    debugger;
    let model = {id: this.id, password: form.controls["password"].value};
     this._authService.refreshPassword(model,res=>{
      this._toastr.toast(ToastrType.Success,res.message,"Başarılı",ToastrPosition.TopLeft); 
     });
  }
}

}
