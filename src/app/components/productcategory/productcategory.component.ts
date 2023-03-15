import { Component, Input, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { NgForm } from '@angular/forms';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { ProductcategoryService } from './service/productcategory.service';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { RequestProduct } from 'src/app/common/models/product.request';
import { SwalService } from 'src/app/common/services/swal.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {

  isUpdate:boolean = false;
  isVisibleProductCategory: boolean = false;
  productStores: ProductStoreModel[] = [];
  file:any ;
  search:string = "";
  productId:string ="";
  product:ProductModel = new ProductModel();
  
  isProductBtnClick = true;
  isCategoryBtnClick = false;
  
  categories:CategoryModel[] = [];
  quantityTypes:QuantityTypeModel[] = [];
  productCategories : ProductCategoryModel[] = [];
  
  selectedProductStore:ProductStoreModel = new ProductStoreModel();
  selectedCategryId:string ="";
  
  filterModel:FilterModel = new FilterModel();
  constructor(
    private _productCategoryService: ProductcategoryService,
    private _toastrService: ToastrService,
    private _swal :SwalService
  ){
    this.filterModel.pageNumber=1 ;
    this.filterModel.pageSize=10;
    this.selectedProductStore = new ProductStoreModel();
  }
  ngOnInit(): void {
    this.getAll();
    this.getQuantityType();
    this.getCategories();
  }
  getAll(){

     let filterModel:FilterModel = new FilterModel();
    filterModel.pageNumber=1;
    filterModel.pageSize=100;
    this._productCategoryService.getProductStores(filterModel,res=>{
      this.productStores = res.data;
    })
  }
  updateProductCategory(productStore:ProductStoreModel){
    debugger;
    this.selectedProductStore = productStore;
  }
  btnProductClicked(){
    this.isCategoryBtnClick = false;
    this.isProductBtnClick = true;
  }
  btnCategoryClicked(){
    this.isCategoryBtnClick = true;
    this.isProductBtnClick = false;
  }
  getQuantityType(){
    this._productCategoryService.getQuantityTypes(res=>{
      this.quantityTypes = res.data;
    })
  }
  getCategories(){
    this._productCategoryService.getCategories(res=>{
        this.categories = res.data;
    });
  }
  deleteById(productStore:ProductStoreModel){
    this._swal.callSwal("Sil",productStore.name+ " ürünü silmek istiyor musunuz","","question",()=>{
      this._productCategoryService.deleteById(productStore.id,res=>{
        console.log(res);
      })
    })
  }
  toggleProductCategory(){
    this.isVisibleProductCategory = !this.isVisibleProductCategory;
  }
  createProduct(form:NgForm){
      let code = form.controls["code"].value;
      let name = form.controls["name"].value;
      let description = form.controls["description"].value;
      let quantityTypeId = form.controls["quantityTypeId"].value;
      let price = form.controls["price"].value;
            
      let formData = new FormData();
      formData.append("code",code);
      formData.append("name",name);
      formData.append("description",description);
      formData.append("quantityTypeId",quantityTypeId);
      formData.append("price",price);
      formData.append("imageUrl",this.file,this.file.name);
      formData.append("storeId","083C4780-7EDA-4008-BDB8-7F9A141AD8D8");
      if(!this.isUpdate){
        this._productCategoryService.createProduct(formData,res=>{
          this._toastrService.toast(ToastrType.Success,res.message,"Kayıt");
          this.productId = res.data;
          console.log(res);
          console.log(this.productId);
        })
      }
      
  }
  handleFileInput(event:any){
    this.file = event.target.files[0];
  }

  createProductCategory(form:NgForm){

      let categoryId =  form.controls["categoryId"].value;
      let model:{productId:string,categoryId:string} ={
        productId:this.productId,
        categoryId:categoryId
      }
    this._productCategoryService.createProductCategory(model,res=>{
        this._toastrService.toast(ToastrType.Success,res.message);
        this.getProductCategoryByProductId(this.productId);
      
    })
  }

  getProductCategoryByProductId(productId:string){
    this._productCategoryService.getProductCategoryByProductId(productId,res=>{
      this.productCategories = res.data;
    });
  }
}
