import { Injectable, OnInit } from '@angular/core';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService 
 {

  constructor(
      private _http: GenericHttpService
  ) { }


  getAll(model:FilterModel,callBack: (res:ResponseModel<ProductWithCategories[]>)=>void){
    
    this._http.post<ResponseModel<ProductWithCategories[]>>("/Product/GetAllProducts",model,res => callBack(res))
  }
  getAllCategories(callBack:(res:ResponseModel<CategoryModel[]>)=> void){
    this._http.get<ResponseModel<CategoryModel[]>>("/Category/GetAll",res =>{
      callBack(res);
    })
  }
  getProductsByCategoryId(categoryId:string,callBack:(res:ResponseModel<ProductWithCategories[]>)=> void){
    let model ={categoryId:categoryId}
    this._http.post<ResponseModel<ProductWithCategories[]>>("/Product/GetProductsByCategoryId",model,res=>callBack(res));
  }
}
