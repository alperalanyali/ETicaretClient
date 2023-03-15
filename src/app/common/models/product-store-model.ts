import { CategoryModel } from "./category.model";
import { ProductCategoryModel } from "./product-category.model";
import { ProductModel } from "./product.model";
import { QuantityTypeModel } from "./quantityType.model";
import { StoreModel } from "./store.model";

export class ProductStoreModel{
    id:string;
    code:string = "";
    name:string ="";
    quantityTypeId:string = "";
    imageUrl:FormData;
    imageUrl2:string = "";      
    quantityType:QuantityTypeModel;
    description:string ="";
    productCategories : ProductCategoryModel[] = [];
    store:StoreModel = new StoreModel();;
    price:Number;   
}