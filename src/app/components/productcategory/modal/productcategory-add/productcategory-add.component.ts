import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { FilterModel } from 'src/app/common/models/filter.model';
import { NgForm } from '@angular/forms';
import { ProductCategoryModel } from 'src/app/common/models/product-category.model';
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
  
  product:ProductModel = new ProductModel();
  productCategories : ProductCategoryModel[] = [];
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
    console.log(this._productCategoryService.data);  
  }

  ngOnInit(): void {    
    this.getQuantityTypes();
    this.getCategories();
  
    this.productId = this._productCategoryService.data.id;
    this.productCategories = this._productCategoryService.data.productCategories;
    this.getProductCategories();
    
  }

  getQuantityTypes(){
    this._productCategoryService.getQuantityType(res => {
      this.quantityTypes = res.data;
    })
  }
  getCategories(){
    this._productCategoryService.getAllCategory(res=>{
      // console.log(res.data);
        this.categories = res.data;
    });
  }
  addNewProduct(form:NgForm){     
    let model = new ProductModel();
    // console.log(form)
   
    model.code = form.controls["code"].value;
    model.name = form.controls["name"].value;
    model.description = form.controls["description"].value;
    model.price = form.controls["price"].value;
    model.quantityType = form.controls["quantityTypeId"].value;
    
    
    // formData.append("image",this.file,this.file.name)  
    if(!this.isUpdate){      
      debugger;
      const formData = new FormData();
      formData.append("code",model.code);
      formData.append("name",model.name);
      formData.append("description",model.description);
      formData.append("price",model.price.toString());
      formData.append("quantityTypeId",model.quantityType.toString());
      formData.append("imageUrl",this.file,this.file.name);
      let controlModal = new RequestProduct();
      controlModal.code = model.code;
      controlModal.name = model.name;
      let checkExists      
      let result = this._productCategoryService.checkProductExist(controlModal,res => {
        // console.log(res);
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
    }else {      
      const formData = new FormData();
      formData.append("code",model.code);
      formData.append("name",model.name);
      formData.append("description",model.description);
      formData.append("price",model.price.toString());
      formData.append("quantityTypeId",model.quantityType.toString());
      formData.append("imageUrl",this.file,this.file.name);
      formData.append("id",this._productCategoryService.data.id);
      console.log(formData);
      this._productCategoryService.updateProduct(formData,res=>{
        console.log(res);
      })
    }
      
  }

  addProductCategory(){
    
    if(this._productCategoryService.data.code != "")
        this.productId = this._productCategoryService.data.id;    
    
    let model = new RequestProductCategory();
    model.productId = this.productId;
    model.categoryId = this.selectedCategoryId;
 
    this._productCategoryService.createProductCategory(model,res => {
        this._toastr.toast(ToastrType.Success,res.message,"Başarılı");
      //  this.getProductCategories();
      this.getProductById();
        
    })
  }
  handleFileInput(event:any){
    this.file = event.target.files[0];
    // console.log(this.file);
    
  }
  getProductCategories(){    
    this._productCategoryService.getProductCategoryByProductId(this.productId,res=>{
      console.log(res);
    this.productCategories = res.data;
    })
  }

  getProductById(){
    this._productCategoryService.getProductById(this._productCategoryService.data.id,res=>{
      this._productCategoryService.data = res.data;
    })
  }
  
  clearData(){
    this._productCategoryService.data = new ProductWithCategories();
  }

  deleteProductCategoryById(id:string){    
    this._swal.callSwal("Evet","Silme","Üründen kategori kaldırmak istiyor musunuz?",()=>{
      this._productCategoryService.deleteProductCategoryById(id,res=>{
          this._toastr.toast(ToastrType.Info,res.message,"Bilgilendirme");
          this._productCategoryService.getProductById(this._productCategoryService.data.id,res=>{
            this._productCategoryService.data = res.data;
          })
      });
    })
  }
}
