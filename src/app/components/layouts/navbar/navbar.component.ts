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
  isProductsVisible:boolean=false;
  isAdminVisible:boolean=false;
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
   
  ]

  constructor(
    private _swal: SwalService
  ){
    
  }
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user)    
    if (user.role.code == "Admin"){
      this.isProductsVisible = true;
          this.navbars.push( {
            name:"Ürünler",
            link:"/productcategory",
             class: this.isProductsVisible ? 'visible' : "invisible"
          });
          this.navbars.push({
            name:"Kategoriler",
            link:"/category",
             class: this.isProductsVisible ? 'visible' : "invisible"
          })
          this.navbars.push({
            name:"Mağazalar",
            link:"/store",
             class: this.isProductsVisible ? 'visible' : "invisible"
          });
          this.navbars.push({
            name:"Kullanıcılar",
            link:"/user",
             class: this.isProductsVisible ? 'visible' : "invisible"
          })
    }
    else if(user.role.code == "Store") {
      this.isProductsVisible = true;
          this.navbars.push( {
            name:"Ürünler",
            link:"/productcategory",
            class: this.isProductsVisible ? 'visible' : "invisible"
          });
    }
    
    if(user != null){
      this.isLoginVisible = false;
    }
  } 
  
  logout(){
    this._swal.callSwal("Evet","Bilgi","Çıkış yapmak istiyor musunuz?","question",()=>{
      localStorage.removeItem("user");
      this.isLoginVisible = true;
    });
  }
}
