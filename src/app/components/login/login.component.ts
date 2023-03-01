import { Component } from '@angular/core';
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
      private store:Store<{auth:boolean}>
  ){
  this.auth$ = store.select('auth');
}
  login(){
      this._router.navigateByUrl("/")

 
  }
}
