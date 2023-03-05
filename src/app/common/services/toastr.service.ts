import { Injectable } from '@angular/core';

declare const $:any;
declare const toastr:any;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  toast(type:ToastrType, message:string,title:string=""){
    
    switch(type){
      case ToastrType.Success:
        toastr.success(message,title);
        break;
      case ToastrType.Info:
        toastr.info(message,title);
        break;
      case ToastrType.Warning:
        toastr.warning(message,title);
        break;
      case ToastrType.Error:
        toastr.error(message,title);
        break;
      default:
        break;
    }
    
    $('.toastrDefaultSuccess').click(function() {
      toastr.success('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    });
    $('.toastrDefaultInfo').click(function() {
      toastr.info('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    });
    $('.toastrDefaultError').click(function() {
      toastr.error('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    });
    $('.toastrDefaultWarning').click(function() {
      toastr.warning('Lorem ipsum dolor sit amet, consetetur sadipscing elitr.')
    });

  }
}


export enum ToastrType{
  Success,
  Error,
  Info,
  Warning
}