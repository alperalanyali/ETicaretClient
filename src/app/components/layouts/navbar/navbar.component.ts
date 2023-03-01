import { Component, Input } from '@angular/core';

import { NavbarModel } from 'src/app/common/models/navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  navbars: NavbarModel[] = [
  
    {
      name:"Siparişlerim",
      link:"/orders",
      class:""
    },
    {
      name:"Kargom Nerede",
      link:"/mycargo",
      class:""
    },
    {
      name:"Ürünler",
      link:"/productcategory",
      class:""
    }
  ]
}
