import { ProductCategoryModel } from "./product-category.model";
import { QuantityTypeModel } from "./quantityType.model";

export class ProductModel {
    id:string = "";
    code:string = "";
    name:string ="";
    quantityTypeId:string = "";
    imageUrl:FormData;
    imageUrl2:string = "";
    price:number=0;    
    quantityType:QuantityTypeModel;
    description:string ="";
    productCategories : ProductCategoryModel[] = [];
    
}