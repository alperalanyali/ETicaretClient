import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Toastr2Service {

  constructor(
    private _toastr:ToastrService
  ) { }

  toast(type:ToastrType,message:string,title:string = "",position:ToastrPosition=ToastrPosition.BottomRight){
    switch(type){
      case ToastrType.Success:
        this._toastr.success(message,title,{
          positionClass:position,
          tapToDismiss:true,
          closeButton:true
        })
        break;
      case ToastrType.Error:
        this._toastr.error(message,title,{
          positionClass:position,
          tapToDismiss:true,
          closeButton:true
        });        
        break;
      case ToastrType.Info:
        this._toastr.info(message,title,{
          positionClass:position,
          tapToDismiss:true,
          closeButton:true
        });
        break;
      case ToastrType.Warning:
        this._toastr.warning(message,title,{
          positionClass:position,
          tapToDismiss:true,
          closeButton:true
        });
        break;
    }
  }
}
export enum ToastrType{
  Success,
  Error,
  Info,
  Warning
}

export enum ToastrPosition{
  TopLeft="toast-top-left",
  BottomLeft="toast-bottom-left",
  TopRight="toast-top-right",
  BottomRight="toast-bottom-right",
  BottomCenter="toast-bottom-center",
  
  
}