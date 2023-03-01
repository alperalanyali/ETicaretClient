import { Injectable, OnInit } from '@angular/core';

import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService 
 {

  constructor(
      private _http: GenericHttpService
  ) { }

  getAll(model:FilterModel,callBack: (res:ResponseModel<ProductCategoryModel[]>)=>void){
    
    this._http.post<ResponseModel<ProductCategoryModel[]>>("/ProductCategory/GetAllProductCategory",model,res => callBack(res))
  }
}
