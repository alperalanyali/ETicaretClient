import { AppComponent } from './app.component';
import { BasketComponent } from './components/basket/basket.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/auths/login/login.component';
import { MycargoComponent } from './components/mycargo/mycargo.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './components/orders/orders.component';
import {ProductcategoryComponent} from './components/productcategory/productcategory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/auths/register/register.component';
import {RouterModule} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { ValidDirective } from './common/directive/valid.directive';
import { ForgotPasswordComponent } from './components/auths/forgot-password/forgot-password.component';
import { MailConfirmComponent } from './components/auths/mail-confirm/mail-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    MycargoComponent,
    BasketComponent,
    ProductcategoryComponent,
     ProfileComponent,
     ValidDirective,
     ForgotPasswordComponent,
     MailConfirmComponent
     
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,  
    StoreModule.forRoot({ count: counterReducer }),
    RouterModule.forRoot([
      {
        path:"",
        component:LayoutsComponent,
        children:[     
          {
            path:"",
            component:HomeComponent
          },
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
          
          },
          {
            path:"basket",
            component:BasketComponent
          },
          {
            path:"productcategory",
            component:ProductcategoryComponent
          },
          {
            path:"profile",
            component:ProfileComponent
          }
        ]
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path:"forgotPassword/:id/:code",
        component:ForgotPasswordComponent
      },
      {
        path:"mailConfirm/:value",
        component:MailConfirmComponent
      }
    ]),
    StoreModule.forRoot({}, {})
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
