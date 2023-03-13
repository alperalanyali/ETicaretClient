import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { AddressModel } from 'src/app/common/models/address.model';
import { BasketItemModel } from 'src/app/common/models/basketItem.model';
import { BasketModel } from 'src/app/common/models/basket.model';
import { BasketService } from './service/basket.service';
import { CreditCardInfo } from 'src/app/common/models/credit-card-info.model';
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
  creditCardInfo:CreditCardInfo = new CreditCardInfo();
  months:number[] = []
constructor(
  private _basketService: BasketService,
  private  _toastr: ToastrService,
  private _swal: SwalService
  ){
  for (let index = 1; index <= 12; index++) {
    this.months.push(index);
    
  }
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
  updateBasketItem(event:any,index:number){
    let basketItem = this.basket.basketItems[index];
    basketItem.quantity = event.target.value;
    basketItem.totalPrice = basketItem.quantity * +basketItem.productStore.price;
    this._basketService.updateBasketItem(basketItem,res=>{
        this._toastr.toast(ToastrType.Info,res.message);

        this.getBasket();
    })
  }
  deleteBasketItem(id:string){
      this._swal.callSwal("Evet","Silme İşlemi","Ürünü sepetten silmek istiyor musunuz?","question",()=>{
        this._basketService.deleteBasketItem(id,res=>{
          this._toastr.toast(ToastrType.Info,res.message,"İşlem");
          this.getBasket();
        })
      })
  }
  getAddresses(){
    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    this._basketService.getAddressesByUserId(user.userId, res=>{
      this.addresses = res.data;
      console.log(this.addresses);
    })
  }
  getPaymentTypes(){
    this._basketService.getPaymentType(res=>{
      this.paymentTypes = res.data;
      console.log(this.paymentTypes);
    })
  }
  confirmBasket(){
    let user = JSON.parse(localStorage.getItem("user"));
    this.order.userId = user.userId;  
    this.order.basketId = this.basket.id;
    this._basketService.createOrder(this.order,this.basket,res=>{
      this._toastr.toast(ToastrType.Success,res.message,"İşlem");
      let orderId:string="";
      this._basketService.getLastOrderByUserId(user.userId,res=>{
        orderId=res.data.id;
        this.getBasket();
      })    
    })
  }

  
  checkCreditNumber(){      
 
      if(this.creditCardInfo.carNumber.length == 4){
        this.creditCardInfo.carNumber = this.creditCardInfo.carNumber+" "
      }
      else if(this.creditCardInfo.carNumber.length == 9){
        this.creditCardInfo.carNumber = this.creditCardInfo.carNumber+" "
      }
      else if(this.creditCardInfo.carNumber.length == 14){
        this.creditCardInfo.carNumber = this.creditCardInfo.carNumber+" "
      } else {
      
      }
      
      
  }
}
