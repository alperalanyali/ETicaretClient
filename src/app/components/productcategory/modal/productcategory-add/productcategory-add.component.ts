import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { NgForm } from '@angular/forms';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductWithCategories } from 'src/app/common/models/product-with-category.model';
import { ProductcategoryService } from '../../service/productcategory.service';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { RequestProduct } from 'src/app/common/models/product.request';
import { RequestProductCategory } from '../../models/request-product-category';
import { SwalService } from 'src/app/common/services/swal.service';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'app-productcategory-add',
  templateUrl: './productcategory-add.component.html',
  styleUrls: ['./productcategory-add.component.css']
})
export class ProductcategoryAddComponent implements OnInit {
  
  @Input() isUpdate:boolean

  selectedProductCategory:ProductWithCategories = new ProductWithCategories();
  product:ProductModel = new ProductModel();
  productId :string="";
  selectedCategoryId:string="";
  quantityTypes:QuantityTypeModel[] = [];
  categories:CategoryModel[] = [];
  file:any;
  constructor(
    public _productCategoryService: ProductcategoryService, 
    private _swal:SwalService,
    private _toastr :ToastrService
  ) {
    
  }

  ngOnInit(): void {    
    this.getQuantityTypes();
    this.getCategories();
    console.log(this.selectedProductCategory);
  }

  getQuantityTypes(){
    this._productCategoryService.getQuantityType(res => {
      this.quantityTypes = res.data;
    })
  }
  getCategories(){
    this._productCategoryService.getAllCategory(res=>{
      console.log(res.data);
        this.categories = res.data;
    });
  }
  addNewProduct(form:NgForm){     
       
    if(!this.isUpdate){      
      let model = new ProductModel();
      console.log(form)
      const formData = new FormData();
      model.code = form.controls["code"].value;
      model.name = form.controls["name"].value;
      model.description = form.controls["description"].value;
      model.price = form.controls["price"].value;
      model.quantityType = form.controls["quantityTypeId"].value;
      
      formData.append("code",model.code);
      formData.append("name",model.name);
      formData.append("description",model.description);
      formData.append("price",model.price.toString());
      formData.append("quantityTypeId",model.quantityType.toString());
      formData.append("imageUrl",this.file,this.file.name);
      formData.append("image",this.file,this.file.name)    
      
      let controlModal = new RequestProduct();
      controlModal.code = model.code;
      controlModal.name = model.name;
      let checkExists
      let result = this._productCategoryService.checkProductExist(controlModal,res => {
        console.log(res);
        checkExists = res.isExist;
        if(!checkExists){
          this._productCategoryService.createNewProduct(formData,res=>{
          this._toastr.toast(ToastrType.Success,res.message);
          this._productCategoryService.getProductByCodeAndName(controlModal,res => {
            this.product = res.data;
            this.productId = this.product.id;
          })
        })  
        }else {
          this._toastr.toast(ToastrType.Error,"Böyle bir kayıt var","Hata");
        }       
      })      
    }
      
  }

  addProductCategory(){
    debugger;
    if(this.isUpdate)
        this.productId = this.selectedProductCategory.id;    
    console.log(this.selectedCategoryId)
    let model = new RequestProductCategory();
    model.productId = this.productId;
    model.categoryId = this.selectedCategoryId
    this._productCategoryService.createProductCategory(model,res => {
        this._toastr.toast(ToastrType.Success,res.message,"Başarılı");
        
    })
  }
  handleFileInput(event:any){
    this.file = event.target.files[0];
    // console.log(this.file);
    
  }
 
  clearData(){
    this._productCategoryService.data = new ProductWithCategories();
  }

}
