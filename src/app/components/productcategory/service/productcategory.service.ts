import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { RequestProduct } from 'src/app/common/models/product.request';
import { RequestProductCategory } from '../models/request-product-category';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  data:ProductWithCategories = new ProductWithCategories();
  constructor(
    private _httpService:GenericHttpService
  ) { }
    getAllProducts(filterModel:FilterModel,callBack:(res:ResponseModel<ProductModel[]>)=> void){
        this._httpService.post<ResponseModel<ProductModel[]>>("/Product/GetAllProducts"
        ,filterModel,res=>{
          callBack(res);
        })
      
    }
    getAllCategory(callBack:(res:ResponseModel<CategoryModel[]>)=> void){
      this._httpService.get<ResponseModel<CategoryModel[]>>("/Category/GetAll",res =>{
        callBack(res);
      })
    }
    createNewProduct(model:any,callBack:(res:ResponseModel<string>)=> void){
      this._httpService.post<ResponseModel<string>>('/Product/Create',model,res => callBack(res));
    }
    getQuantityType(callBack:(res:ResponseModel<QuantityTypeModel[]>)=> void){
      this._httpService.get<ResponseModel<QuantityTypeModel[]>>('/QuantityType/GetAllQuantityTypes',res=>{
        callBack(res);
      })
    }

    getCategories(callBack:(res:ResponseModel<CategoryModel[]>)=> void){
      this._httpService.get<ResponseModel<CategoryModel[]>>('/Category/GetAll',res=>{
          callBack(res);
      });
    }
    getAllProductCategory(model:FilterModel,callBack:(res:ResponseModel<ProductWithCategories[]>)=>void){
        this._httpService.post<ResponseModel<ProductWithCategories[]>>('/Product/GetAllProducts',model,res=>{            
            callBack(res);
        });
    }

    createProductCategory(model:RequestProductCategory,callBack:(res:ResponseModel<string>)=>void){
        this._httpService.post<ResponseModel<string>>("/ProductCategory/Create",model,res=>{
            console.log(res);
        })
    }

    checkProductExist(model:RequestProduct,callBack :(res:ResponseModel<boolean>)=>void){
      
      this._httpService.post<ResponseModel<boolean>>('/Product/checkProductExist',model,res => callBack(res));
    }

    getProductByCodeAndName(model:RequestProduct,callBack:(res:ResponseModel<ProductModel>)=> void){
      this._httpService.post<ResponseModel<ProductModel>>("/Product/GetProductByCodeAndName",model,res => callBack(res));
    }

    deleteById(model:RequestProduct, callBack:(res:ResponseModel<string>)=> void){
      this._httpService.post<ResponseModel<string>>("/Product/Delete",model,res=> callBack(res));
    
    }
    deleteProductCategoryById(id:string,callBack:(res:ResponseModel<string>)=> void){
      let model:{id:string} = {id:id};
      this._httpService.post<ResponseModel<string>>("/ProductCategory/Delete",model,res=> callBack(res));
    }
    
}
