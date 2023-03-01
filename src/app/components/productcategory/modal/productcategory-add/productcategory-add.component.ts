import { Component, Input, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ProductModel } from 'src/app/common/models/product.model';
import { ProductcategoryService } from '../../service/productcategory.service';
import { QuantityTypeModel } from 'src/app/common/models/quantityType.model';
import { ResponseModel } from 'src/app/common/models/response.model';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-productcategory-add',
  templateUrl: './productcategory-add.component.html',
  styleUrls: ['./productcategory-add.component.css']
})
export class ProductcategoryAddComponent implements OnInit {
  

  quantityTypes:QuantityTypeModel[] = [];
  file:any;
  constructor(
    private _productCategoryService: ProductcategoryService,
    private _uploadService: UploadService
  ) {
    
  }
  
  ngOnInit(): void {    
    this.getQuantityTypes();
  }

  getQuantityTypes(){
    this._productCategoryService.getQuantityType(res => {
      this.quantityTypes = res.data;
    })
  }

  addNewProduct(form:NgForm){
    let model = new ProductModel();
    console.log(form)
    const formData = new FormData();
    model.code = form.controls["code"].value;
    model.name = form.controls["name"].value;
    model.description = form.controls["description"].value;
    model.price = form.controls["price"].value;
    model.quantityType = form.controls["quantityTypeId"].value;
    formData.append("image",this.file,this.file.name)    
    console.log(formData);
    model.imageUrl = formData;
    
    this._productCategoryService.createNewProduct(model,res=>{
      console.log(res);
    })
  }
  handleFileInput(event:any){
    this.file = event.target.files[0];
    // console.log(this.file);
    
  }
 

}
