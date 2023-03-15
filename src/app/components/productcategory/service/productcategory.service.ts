import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { RequestProduct } from 'src/app/common/models/product.request';
import { RequestProductCategory } from '../models/request-product-category';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  data:ProductStoreModel = new ProductStoreModel();
  productId:string="";
  constructor(
    private _httpService:GenericHttpService
  ) { }
  

  getProductStores(filterModel:FilterModel,callBack:(res:ResponseModel<ProductStoreModel[]>)=> void) {
    this._httpService.post<ResponseModel<ProductStoreModel[]>>("/ProductStore/GetAll",filterModel,res => {
            callBack(res);
          }) 
  }
  getQuantityTypes(callBack:(res:ResponseModel<QuantityTypeModel[]>)=> void){
    this._httpService.get<ResponseModel<QuantityTypeModel[]>>("/QuantityType/GetAllQuantityTypes",res => callBack(res));
  }

  getCategories(callBack:(res:ResponseModel<CategoryModel[]>)=> void){
    this._httpService.get<ResponseModel<CategoryModel[]>>("/Category/GetAll",res => callBack(res));
  }
  createProduct(model:any,callBack:(res:ResponseModel<string>)=> void){
 
    this._httpService.post<ResponseModel<string>>("/Product/create",model,res =>{
      callBack(res)      
    } );
  }

  createProductCategory(model:any,callBack:(res:ResponseModel<string>)=> void){
    this._httpService.post<ResponseModel<string>>("/ProductCategory/Create",model,res => callBack(res));  
  }
  
  getProductCategoryByProductId(productId:string,callBack:(res:ResponseModel<ProductCategoryModel[]>)=>void){
      this._httpService.post<ResponseModel<ProductCategoryModel[]>>("/ProductCategory/GetProductCategoriesByProductId",productId,res => callBack(res));
  }

  deleteById(productStoreId:string,callBack:(res:ResponseModel<string>)=> void){
      let model:{id:string}={id:productStoreId};
      this._httpService.post<ResponseModel<string>>("/ProductStore/Delete",model,res=>callBack(res));
  }
}
