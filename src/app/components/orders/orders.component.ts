import { Component, OnInit } from '@angular/core';

import { OrderModel } from 'src/app/common/models/order.model';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:OrderModel[] = [];

  constructor(
    private _orderService:OrderService
  ){
    
  }
  ngOnInit(): void {
    this.getOrdersByUserId();
  }


  getOrdersByUserId(){
    this._orderService.getOrdersByUserId(res=>{
        this.orders = res.data;
        console.log(this.orders);
    });
  }
}
