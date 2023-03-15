import { Pipe, PipeTransform } from '@angular/core';

import { ProductStoreModel } from 'src/app/common/models/product-store-model';

@Pipe({
  name: 'productStorePipe'
})
export class ProductStorePipe implements PipeTransform {

  transform(value: ProductStoreModel[],search:string): ProductStoreModel[] {
    if(search=="")
      return value;
      return value.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

}
