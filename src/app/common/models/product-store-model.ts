import { CategoryModel } from "./category.model";
import { ProductCategoryModel } from "./product-category.model";
import { ProductModel } from "./product.model";
import { QuantityTypeModel } from "./quantityType.model";
import { StoreModel } from "./store.model";

export class ProductStoreModel{
    id:string;
    product:ProductModel;
    store:StoreModel;
    price:Number;   
}