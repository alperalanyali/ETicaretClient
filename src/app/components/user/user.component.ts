import { Component, OnInit } from '@angular/core';

import { FilterModel } from 'src/app/common/models/filter.model';
import { UserModel } from 'src/app/common/models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users:UserModel[] = [];
  constructor(
    private _userService: UserService
  ){
    
  }
  
  ngOnInit(): void {
    this.getAllUser();
  } 

  getAllUser(){
    let filterModel : FilterModel = new FilterModel();
    this._userService.getAll(filterModel,res => {
      this.users = res.data;
    })
  }
}
