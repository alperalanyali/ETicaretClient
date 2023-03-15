import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { NgForm } from '@angular/forms';
import { StoreModel } from './models/store.model';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  stores:StoreModel[]= [];
  store:StoreModel = new StoreModel();
  constructor(
    private _storeService: StoreService,
    private _toastr: ToastrService

  ){
    
  }
  
  ngOnInit(): void {
    this.getAll();
  } 


  getAll(){
    this._storeService.getAll(res=>{
        this.stores = res.data;
    })
  }


  createStore(form:NgForm){
    if(form.valid){
      
      this._storeService.createNew(this.store,res=>{
        this._toastr.toast(ToastrType.Success,res.message);
      })
    }
  }

 
}
