import { CategoryModel } from "./category.model";
import { ProductModel } from "./product.model";

export class ProductCategoryModel{
    id:string;
    product:ProductModel;
    category:CategoryModel;
    
}