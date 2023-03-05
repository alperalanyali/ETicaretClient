import { Component, Input, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { ProductcategoryService } from './service/productcategory.service';
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
  productWithCategories: ProductWithCategories[] = [];
  products:ProductModel[]=[];
  categories:CategoryModel[] = [];
  selectedProductCategory:ProductWithCategories = new ProductWithCategories();
  selectedCategryId:string ="";
  filterModel:FilterModel = new FilterModel();
  constructor(
    private _productCategoryService: ProductcategoryService,
    private _toastrService: ToastrService,
    private _swal :SwalService
  ){
    this.filterModel.pageNumber=1 ;
    this.filterModel.pageSize=10;
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this._productCategoryService.getAllProductCategory(this.filterModel,res =>{
      this.productWithCategories = res.data;
      console.log(this.productWithCategories)
    })
    this._productCategoryService.getAllCategory(res=>{      
      this.categories = res.data;
    })
    let filterModel:FilterModel = new FilterModel();
    filterModel.pageNumber=1;
    filterModel.pageSize=100;
    this._productCategoryService.getAllProducts(filterModel,res=>{
        this.products = res.data;        
    });
  }
  
  toggleProductCategory(){
    this.isVisibleProductCategory = !this.isVisibleProductCategory;
  }

  createProductCategory(){
    let productId = document.getElementById('productId') as HTMLSelectElement;
    let categoryId = document.getElementById('categoryId') as HTMLSelectElement;
    let model:{ productId:string,categoryId:string} = {
      productId: productId.value,
      categoryId:categoryId.value
    };
    this._productCategoryService.createProductCategory(model,res=>{
        console.log(res);
        this.getAll();
        this.isVisibleProductCategory = false;
    });
  }
  getProductCategory(model:ProductWithCategories){
    this._productCategoryService.data = {...model};
    let openModal = document.getElementById("openModal") as HTMLElement;
    this.isUpdate =true;
    openModal.click()
    
    this._productCategoryService.getAllProductCategory(this.filterModel,res => {
      this.products = res.data;
    });
  }

  deleteById(id:string) {
    let model:RequestProduct = new RequestProduct();
    model.id = id;
    this._swal.callSwal("Evet","Silme","Ürünü silmek istiyor musunuz?",()=>{
      console.log("sssd");
      this._productCategoryService.deleteById(model,res=>{
        this._toastrService.toast(ToastrType.Info,res.message,"");
        this.getAll();
      })
    }   
    )
  }
 
  deleteProductCategoryById(id:string){    
    this._swal.callSwal("Evet","Silme","Üründen kategori kaldırmak istiyor musunuz?",()=>{
      this._productCategoryService.deleteProductCategoryById(id,res=>{
          this._toastrService.toast(ToastrType.Info,res.message,"Bilgilendirme");
          this.getAll();
      });
    })
  }
}
