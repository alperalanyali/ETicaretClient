import { Component, Input, OnInit } from '@angular/core';

import { BasketService } from '../../basket/service/basket.service';
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

   
  ]

  constructor(
    private _swal: SwalService,
    public _basketService: BasketService
  ){
    
  }
  ngOnInit(): void {
    let userLocal = localStorage.getItem("user")
    let user
    if(userLocal){
     user = JSON.parse(userLocal);
    this._basketService.getBasketCountByUserId(user.userId,res => {
      console.log(res);
    })
    }
      
    
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
      window.location.reload();
    });
  }
}
