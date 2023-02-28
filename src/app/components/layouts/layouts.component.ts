import { Component } from '@angular/core';
import { NavbarModel } from 'src/app/common/models/navbar.model';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {

  navbars: NavbarModel[] = [
  
    {
      name:"Siparişlerim",
      link:"/orders",
      class:""
    },
    {
      name:"Kargom Nerede",
      link:"/home",
      class:""
    },
  ]
}
