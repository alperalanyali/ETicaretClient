import { Pipe, PipeTransform } from '@angular/core';

import { ProductStoreModel } from 'src/app/common/models/product-store-model';

@Pipe({
  name: 'productcategory'
})
export class ProductcategoryPipe implements PipeTransform {

  transform(value: ProductStoreModel[],search:string): ProductStoreModel[] {
    if(search == "")
        return value;
    return value.filter(p => p.name.toLowerCase().includes(search.toLocaleLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.store.storeName.toLowerCase().includes(search.toLowerCase()) )
  }

}
