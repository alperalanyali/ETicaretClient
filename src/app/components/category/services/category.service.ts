import { CategoryModel } from 'src/app/common/models/category.model';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http:GenericHttpService
  ) { }

  getAll(callBack:(res:ResponseModel<CategoryModel[]>) => void){
    this._http.get<ResponseModel<CategoryModel[]>>('/Category/GetAll',res=>callBack(res));
  }

  createCategory(model:CategoryModel,callBack:(res:ResponseModel<string>)=> void){
      this._http.post<ResponseModel<string>>('/Category/Create',model,res=>callBack(res));
  }

  updateCategory(model:CategoryModel,callBack:(res:ResponseModel<string>)=> void){
    this._http.post<ResponseModel<string>>('/Category/Update',model,res=>callBack(res));
  }

  deleteCategory(model:CategoryModel,callBack:(res:ResponseModel<string>)=> void){
    this._http.post<ResponseModel<string>>('/Category/Delete',model,res=>callBack(res));
}
}
