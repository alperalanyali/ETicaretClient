import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreModel } from './models/store.model';
import { StoreService } from './services/store.service';
import { SwalService } from 'src/app/common/services/swal.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  stores:StoreModel[]= [];
  store:StoreModel = new StoreModel();
  isUpdate:boolean = false;
  
  constructor(
    private _storeService: StoreService,
    private _toastr: ToastrService,
    private _swal:SwalService
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

  get(store:StoreModel){
    this.store = store;
  }
  createStore(form:NgForm){
    if(form.valid){
      if(this.isUpdate){
        this._storeService.update(this.store,res=>{
          this._toastr.toast(ToastrType.Success,res.message);
          this.getAll();
          this.clear();
        })
      }else {
        this._storeService.createNew(this.store,res=>{
          this._toastr.toast(ToastrType.Success,res.message);
          this.getAll();
          this.clear();
        })  
      }
    }
  }

  delete(store:StoreModel){
    this._swal.callSwal("Silme","Silme İşlemi",store.storeName+" mağazısını silmek istiyor musunuz?","question",()=>{
      this._storeService.delete(store.id,res=>{
        this._toastr.toast(ToastrType.Info,res.message);
        this.getAll();
      })
    })
  }
  clear(){
    this.store = new StoreModel();
  }

 
}
