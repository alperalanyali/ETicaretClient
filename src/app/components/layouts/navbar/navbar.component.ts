import { Component, Input, OnInit } from '@angular/core';

import { NavbarModel } from 'src/app/common/models/navbar.model';
import { SwalService } from 'src/app/common/services/swal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoginVisible:boolean=true;
  navbars: NavbarModel[] = [
    {
      name:"Siparişlerim",
      link:"/orders",
      class:""
    },
    {
      name:"Kargom Nerede",
      link:"/mycargo",
      class:""
    },
    {
      name:"Ürünler",
      link:"/productcategory",
      class:""
    }
  ]

  constructor(
    private _swal: SwalService
  ){
    
  }
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user"));
    
    if(user != null){
      this.isLoginVisible = false;
    }
  } 
  
  logout(){
    this._swal.callSwal("Evet","Bilgi","Çıkış yapmak istiyor musunuz?",()=>{
      localStorage.removeItem("user");
      this.isLoginVisible = true;
    });
  }
}
