import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { FilterModel } from 'src/app/common/models/filter.model';
import { NgForm } from '@angular/forms';
import { StoreModel } from '../store/models/store.model';
import { SwalService } from 'src/app/common/services/swal.service';
import { UserModel } from 'src/app/common/models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  stores:StoreModel[] = [];
  users:UserModel[] = [];
  selectedUser:UserModel = new UserModel();
  constructor(
    private _userService: UserService,
    private _swal: SwalService,
    private _toastr:ToastrService
  ){
    
  }
  
  ngOnInit(): void {
    this.getAllUser();
    this.getStores();
  } 

  getAllUser(){
    let filterModel : FilterModel = new FilterModel();
    this._userService.getAll(filterModel,res => {
      this.users = res.data;
    })
  }
  getUser(user:UserModel){
    this.selectedUser = user;
  }
  sendForgotPassword(user:UserModel){
    this._swal.callSwal("Gönder","Emin misiniz?",user.fullName + " kullanıcıya şifresini yenilensin emin misiniz?","question",()=>{
      let model = {emailOrUsername:user.email}
      this._userService.sendForgotPassword(model,res=>{
        this._toastr.toast(ToastrType.Info,"Eposta gönderildi","Bilgilendirme");
      })
    })
  }
  getStores(){
    this._userService.getStores(res=>{
      this.stores=res.data; 
    })
  }
  updateUser(form:NgForm){
    let store = form.controls["store"].value;
    this.selectedUser.storeId = store;
    debugger;
    this._userService.updateUser(this.selectedUser,res=>{
      this._toastr.toast(ToastrType.Success,res.message,"İşlem");
    })
  }
}
