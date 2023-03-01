import { Component, OnInit } from '@angular/core';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { ProductcategoryService } from './service/productcategory.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css']
})
export class ProductcategoryComponent implements OnInit {

  isVisibleProductCategory: boolean = false;
  productWithCategories: ProductWithCategories[] = [];
  products:ProductModel[]=[];
  categories:CategoryModel[] = [];
  
  filterModel:FilterModel = new FilterModel();
  constructor(
    private _productCategoryService: ProductcategoryService
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
        
        this.getAll();
        this.isVisibleProductCategory = false;
    });
  }
}
