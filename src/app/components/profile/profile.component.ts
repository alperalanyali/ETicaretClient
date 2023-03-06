import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AddressModel } from 'src/app/common/models/address.model';
import { NgForm } from '@angular/forms';
import { ProfileService } from './service/profile.service';
import { UserModel } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  user:UserModel = new UserModel();
  addresses:AddressModel[] = [];
  newAddress:AddressModel = new AddressModel();
  constructor(
    private _profileService: ProfileService,
    private _toastr : ToastrService
  ){
    
  }
  ngOnInit(): void {
    this.getUserById();
    this.getAddressesByUserId();
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
    this._profileService.addNewAddress(this.newAddress,res=>{
      console.log(res);
      this._toastr.toast(ToastrType.Info,res.message,"İşlem");
    })
  }
}
