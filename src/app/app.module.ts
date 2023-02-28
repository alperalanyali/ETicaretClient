import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import { MycargoComponent } from './components/mycargo/mycargo.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    MycargoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path:"",
        component:LayoutsComponent,
        children:[     
        {
          path:"home",
          component:HomeComponent
        },
          {
            path:"orders",
            component:OrdersComponent
          },
          {
            path:"mycargo",
            component:MycargoComponent
          
          }
        ]
      },
      {
        path:"login",
        component:LoginComponent
      }
    ])
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
