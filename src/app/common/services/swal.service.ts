import Swal, { SweetAlertIcon } from 'sweetalert2';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(confirmBtnName:string,title:string,text:string,type:SweetAlertIcon,callBack:()=>void){
    Swal.fire({
      title: title,      
      html:
        text,      
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:confirmBtnName,   
      icon:type,
      cancelButtonText:
        "Vazgeç",      
    }).then(res => {
      if(res.isConfirmed){
        callBack()
      }
    })
    
  }
}


export enum SwalType {
  error,
  info,
  question,
  warning,
  success
}