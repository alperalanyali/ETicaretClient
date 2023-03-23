import { Component, Input, OnInit } from '@angular/core';
import { Toastr2Service, ToastrPosition } from 'src/app/common/services/toastr2.service';
import {
  ToastrService,
  ToastrType,
} from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { NgForm } from '@angular/forms';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductStoreModel } from 'src/app/common/models/product-store-model';
import { ProductcategoryService } from './service/productcategory.service';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { StoreModel } from 'src/app/common/models/store.model';
import { SwalService } from 'src/app/common/services/swal.service';
import { UserModel } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.css'],
})
export class ProductcategoryComponent implements OnInit {
  user:UserModel = new UserModel();
  isUpdate: boolean = false;
  isVisibleProductCategory: boolean = false;
  productStores: ProductStoreModel[] = [];
  file: any;
  search: string = '';
  productId: string = '';
  product: ProductModel = new ProductModel();
  stores:StoreModel[]=[];
  isProductBtnClick = true;
  isCategoryBtnClick = false;

  categories: CategoryModel[] = [];
  quantityTypes: QuantityTypeModel[] = [];
  productCategories: ProductCategoryModel[] = [];

  selectedProductStore: ProductStoreModel = new ProductStoreModel();
  selectedCategryId: string = '';

  filterModel: FilterModel = new FilterModel();
  constructor(
    private _productCategoryService: ProductcategoryService,
    private _toastrService: ToastrService,
    private _toastr2 : Toastr2Service,
    private _swal: SwalService
  ) {
    this.filterModel.pageNumber = 1;
    this.filterModel.pageSize = 10;
    this.selectedProductStore = new ProductStoreModel();
  }
  ngOnInit(): void {
    this.getAll();
    this.getQuantityType();
    this.getCategories();    
    this.getStores();
    if(localStorage.getItem('user') != null){
      this.user = JSON.parse(localStorage.getItem('user'));      
    }
    console.log(this.user);
  }
  getAll() {
    let filterModel: FilterModel = new FilterModel();
    filterModel.pageNumber = 1;
    filterModel.pageSize = 100;
    this._productCategoryService.getProductStores(filterModel, (res) => {
      this.productStores = res.data;
      console.log(this.productStores)
    });
  }
  get(productStore: ProductStoreModel) {
    this.selectedProductStore = { ...productStore };
    this.isUpdate = true;
    this.getProductCategoryByProductId(this.selectedProductStore.id);
  }

  clear() {
    this.selectedProductStore = new ProductStoreModel();
  }
  btnProductClicked() {
    this.isCategoryBtnClick = false;
    this.isProductBtnClick = true;
  }
  btnCategoryClicked() {
    this.isCategoryBtnClick = true;
    this.isProductBtnClick = false;
  }
  getQuantityType() {
    this._productCategoryService.getQuantityTypes((res) => {
      this.quantityTypes = res.data;
    });
  }
  getCategories() {
    this._productCategoryService.getCategories((res) => {
      this.categories = res.data;
    });
  }

  getStores(){
    this._productCategoryService.getStores(res=>{
        this.stores = res.data;
    });
  }
  deleteById(productStore: ProductStoreModel) {
    this._swal.callSwal(
      'Sil',
      productStore.name + ' ürünü silmek istiyor musunuz',
      '',
      'question',
      () => {
        this._productCategoryService.deleteById(productStore.id, (res) => {
          debugger;
          console.log(res);
          this._toastr2.toast(ToastrType.Warning,res.message,"",ToastrPosition.BottomRight);
          this.getAll();
        });
      }
    );
  }
  toggleProductCategory() {
    this.isVisibleProductCategory = !this.isVisibleProductCategory;
  }
  createProduct(form: NgForm) {
    let code = form.controls['code'].value;
    let name = form.controls['name'].value;
    let description = form.controls['description'].value;
    let quantityTypeId = form.controls['quantityTypeId'].value;
    let price = form.controls['price'].value;
    let inStock = form.controls['inStock'].value;
    let storeId = this.user.storeId;
    if(this.user.role.code == 'Admin'){
      storeId = form.controls['storeId'].value;
    }
     
    let formData = new FormData();
    formData.append('code', code);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantityTypeId', quantityTypeId);
    formData.append('price', price);
    formData.append('inStock', inStock);
    
    formData.append('imageUrl', this.file, this.file.name);
    
    formData.append('storeId', storeId);
    debugger;
    if (!this.isUpdate) {
      this._productCategoryService.createProduct(formData, (res) => {
        this._toastrService.toast(ToastrType.Success, res.message, 'Kayıt');
        this.productId = res.data;
        console.log(res);
        console.log(this.productId);
      });
    } else {      
      formData.append('id', this.selectedProductStore.id);
      this._productCategoryService.updateProduct(formData, (res) => {
        console.log(res);
        this._toastrService.toast(ToastrType.Info, res.message, 'Güncelleme');
      });
    }
    form.reset();
  }
  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }

  deleteByProductCategoryById(productcategory:ProductCategoryModel){
    debugger;
    // this._swal.callSwal("Sil","Kayıt Silme İşlemi",productcategory.product.name + ' üründen bu kategori silmek istiyor musunuz?',"question",()=>{
      this._productCategoryService.deleteProductCategoryById(productcategory.id,res=>{
        this._toastr2.toast(ToastrType.Warning,res.message,'İşlem',ToastrPosition.BottomRight);
        this.getProductCategoryByProductId(productcategory.product.id);
      });
    // });
  }
  createProductCategory(form: NgForm) {
    
    let categoryId = form.controls['categoryId'].value;
    let model: { productId: string; categoryId: string } = {
      productId: this.productId,
      categoryId: categoryId,
    };
    this._productCategoryService.createProductCategory(model, (res) => {
      this._toastrService.toast(ToastrType.Success, res.message);
      this.getProductCategoryByProductId(this.productId);
    });
  }

  getProductCategoryByProductId(productId: string) {    
    this._productCategoryService.getProductCategoryByProductId(
      productId,
      (res) => {
        this.productCategories = res.data;
        console.log(this.productCategories);
      }
    );
  }

  getBack(){
    let closeBtn = document.getElementById('closeBtn');
    closeBtn.click();
    this.getAll();
  }
}
