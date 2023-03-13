import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.css']
})
export class MailConfirmComponent implements OnInit {
  message: string = "Hata!";
  code: string = "";
  
  constructor(
    private _auth: AuthService,
    private _activated: ActivatedRoute,
    private _router: Router

  ){

  }
  ngOnInit(): void {
    debugger;
    this._activated.params.subscribe(res=>{
      if(res["value"]){
        this.code = res["value"];
        this.confirmMail();
      }else
        this._router.navigateByUrl("/login");
    });
  }
  

  confirmMail(){
    debugger;
    this._auth.confirmMail(this.code,res=>{
      this.message = res.message;
      setTimeout(()=> this._router.navigateByUrl("/login"),5000);
    });
  }
  changeClass(){
    if(this.message != "Hata!")
      return "alert alert-success"

    return "alert alert-danger";
  }
}
