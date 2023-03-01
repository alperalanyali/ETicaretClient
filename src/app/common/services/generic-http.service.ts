import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
apiUrl = "http://localhost:5272/api/v1";
  constructor(
    private _http:HttpClient
  ) { }
  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {
    this._http.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) => {
                   
                      callBack(res)
                    },
      error: (err: HttpErrorResponse) =>{        
      
        
      }
    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {    
    this._http.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      
      next: (res) => {
        callBack(res)
      },
      error: (err: HttpErrorResponse) =>{
          console.log(err);
        }
      
    });
    
  }
    

  

  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;    
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {    
    // if (authorize){
    //   let accessToken =JSON.parse(this._crypto.decrypto(localStorage.getItem("accessToken")))      
    //   return { headers: { "Authorization": `Bearer ${accessToken.token.token}`}}
    // }   
    return {}
  }
}
