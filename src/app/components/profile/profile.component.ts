import { Component, OnInit } from '@angular/core';
import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AddressModel } from 'src/app/common/models/address.model';
import { NgForm } from '@angular/forms';
import { OrderModel } from 'src/app/common/models/order.model';
import { OrderService } from '../orders/service/order.service';
import { ProfileService } from './service/profile.service';
import { SwalService } from 'src/app/common/services/swal.service';
import { UserModel } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit  {

  user:UserModel = new UserModel();
  addresses:AddressModel[] = [];
  newAddress:AddressModel = new AddressModel();
  orders:OrderModel[] = [];
  
  constructor(
    private _profileService: ProfileService,    
    private _totastr2:Toastr2Service,
    private _orderService:OrderService,
    private _swal :SwalService
  ){
    
  }
  ngOnInit(): void {
    this.getUserById();
    this.getAddressesByUserId();
    this.getOrders();
  }
  get(address:AddressModel){
    this.newAddress = address;
  }
  getUserById(){
    let user = JSON.parse(localStorage.getItem("user"));
    this._profileService.getUserById(user.userId,res=>{      
      this.user = res.data;
      
    })
  }
  getAddressesByUserId(){
    let user = JSON.parse(localStorage.getItem("user"));    
    this._profileService.getAddressesByUserId(user.userId,res=>{
          this.addresses = res.data;      
     });
  }

  addNewAddress(){
    console.log(this.newAddress);
    let user = JSON.parse(localStorage.getItem("user"));    
    this.newAddress.userId = user.userId;
    this._profileService.addNewAddress(this.newAddress,res=>{
      console.log(res);
      this._totastr2.toast(ToastrType.Info,res.message,"İşlem",ToastrPosition.BottomRight);
      let closeBtn = document.getElementById("closeBtn") as HTMLButtonElement;
      closeBtn.click();
      this.getAddressesByUserId();
    })
  }

  getOrders(){
    let user = JSON.parse(localStorage.getItem("user"));  
    this._orderService.getOrdersByUserId(res=>{
        this.orders=res.data;
        console.log(this.orders);
    });
  }
  deleteById(address:AddressModel){
    this._swal.callSwal("Adresi Sil","Adresi silmek istiyor musunuz?","Emin misiniz?","question",()=>{
      this._profileService.deleteAddress(address,res=>{
        this._totastr2.toast(ToastrType.Warning,"Kayıt  başarıyla silindi","İşlem",ToastrPosition.BottomRight);
        this.getAddressesByUserId();
      })
    })
  }
  clear(){
    this.newAddress = new AddressModel();
  }
}
