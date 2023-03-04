import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(confirmBtnName:string,title:string,text:string,callBack:()=>void){
    Swal.fire({
      title: title,      
      html:
        text,      
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:confirmBtnName,      
      cancelButtonText:
        "Vazgeç",      
    }).then(res => {
      if(res.isConfirmed){
        callBack()
      }
    })
    
  }
}
