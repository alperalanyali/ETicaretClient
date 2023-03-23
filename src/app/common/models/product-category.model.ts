import { CategoryModel } from "./category.model";
import { ProductModel } from "./product.model";
import { ProductStoreModel } from "./product-store-model";

export class ProductCategoryModel{
    id:string;
    product:ProductStoreModel;
    category:CategoryModel;
    
}