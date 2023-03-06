import { ProductModel } from "./product.model";

export class BasketItemModel{
    id:string="";
    basketId:string="";
    productId:string = "";
    product:ProductModel;
    quantity:number = 0;
    totalPrice:number = 0;
}