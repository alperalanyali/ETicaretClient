import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
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
