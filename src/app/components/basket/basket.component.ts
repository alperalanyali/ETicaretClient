import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AddressModel } from 'src/app/common/models/address.model';
import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { BasketService } from './service/basket.service';
import { OrderModel } from 'src/app/common/models/order.model';
import { PaymentTypeModel } from 'src/app/common/models/payment-type.model';
import { SwalService } from 'src/app/common/services/swal.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent  implements OnInit {

  basket: BasketModel = new BasketModel();
  addresses:AddressModel[]= []
  paymentTypes: PaymentTypeModel[] =[];
  order:OrderModel = new OrderModel();
constructor(
  private _basketService: BasketService,
  private  _toastr: ToastrService,
  private _swal: SwalService
  ){
  
}
  
  ngOnInit(): void {
    this.getBasket();
    this.getAddresses();
    this.getPaymentTypes();
  }


  getBasket(){
    let userId = JSON.parse(localStorage.getItem('user')).userId;
    this._basketService.getLastBasketIdByUserId(userId,res=>{
      this.basket = res.data;
    });
  
  }
  updateBasketItem(basketItem:BasketItemModel){
    let quantity = document.getElementById("quantity") as HTMLInputElement;
    basketItem.quantity = +quantity.value;
    basketItem.totalPrice = basketItem.quantity * basketItem.product.price;
    this._basketService.updateBasketItem(basketItem,res=>{
        this._toastr.toast(ToastrType.Info,res.message);

        this.getBasket();
    })
  }
  deleteBasketItem(id:string){
      this._swal.callSwal("Evet","Silme İşlemi","Ürünü sepetten silmek istiyor musunuz?",()=>{
        this._basketService.deleteBasketItem(id,res=>{
          this._toastr.toast(ToastrType.Info,res.message,"İşlem");
          this.getBasket();
        })
      })
  }
  getAddresses(){
    let user = JSON.parse(localStorage.getItem("user"));
    this._basketService.getAddressesByUserId(user.userId, res=>{
      this.addresses = res.data;
    })
  }
  getPaymentTypes(){
    this._basketService.getPaymentType(res=>{
      this.paymentTypes = res.data;
    })
  }
  confirmBasket(){
    let user = JSON.parse(localStorage.getItem("user"));
    this.order.userId = user.userId;  
    this._basketService.createOrder(this.order,res=>{
      this._toastr.toast(ToastrType.Success,res.message,"İşlem");
      let orderId:string="";
      this._basketService.getLastOrderByUserId(user.userId,res=>{
        orderId=res.data.id;
      })

      
    })
  }
}
