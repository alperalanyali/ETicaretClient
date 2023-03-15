import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';
import { StoreModel } from '../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private _http :GenericHttpService    
  ) { }

  getAll(callBack:(res:ResponseModel<StoreModel[]>) =>void){
    this._http.get<ResponseModel<StoreModel[]>>('/Store/GetAll', res => callBack(res));
  }
  
  createNew(model:StoreModel,callBack:(res:ResponseModel<string> )=> void){
    this._http.post<ResponseModel<string>>('/Store/Create', model, res => callBack(res));
  }
  
  update(model:StoreModel,callBack:(res:ResponseModel<string> )=>void){
    this._http.post<ResponseModel<string>>('/Store/Update',model, res => callBack(res));
  }

  delete(id:string,callBack:(res:ResponseModel<string>)=> void){
    let model:{id:string}={id:id};
    this._http.post<ResponseModel<string>>('/Store/Delete',model,res=>callBack(res));
  }  
}
