import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrType } from 'src/app/common/services/toastr.service';

import { CategoryModel } from 'src/app/common/models/category.model';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from 'src/app/common/services/swal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryModel[] = [];
  
  constructor(
    private _categoryService: CategoryService,
    private  _toastr :ToastrService,
    private _swal:SwalService
  ){}
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._categoryService.getAll(res=>{
      this.categories = res.data;
    });
  }

  createNew(form:NgForm){
    debugger;
    if(form.valid){
      let category:CategoryModel = new CategoryModel();
      category.name = form.controls['name'].value;
      category.code = form.controls['code'].value;
      category.itemNo = form.controls['itemNo'].value;

      this._categoryService.createCategory(category,res=>{
          this._toastr.toast(ToastrType.Success,res.message);
          let closeBtn = document.getElementById('closeBtn') as HTMLElement
          closeBtn.click();
          this.getAll();
      }) 
    }
  }

  delete(category:CategoryModel){
      this._swal.callSwal("Sil","Silme İşlemi",category.name+" kategorisini silmek istiyor musunuz?","question",()=>{
        this._categoryService.deleteCategory(category,res=>{
          this._toastr.toast(ToastrType.Info,res.message);
          this.getAll();
        })
      })
  }
}
