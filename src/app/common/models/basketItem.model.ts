import { ProductModel } from "./product.model";
import { ProductStoreModel } from "./product-store-model";

export class BasketItemModel{
    id:string="";
    basketId:string="";
    productStoreId:string = "";
    productStore:ProductStoreModel;
    quantity:number = 0;
    totalPrice:number = 0;
}