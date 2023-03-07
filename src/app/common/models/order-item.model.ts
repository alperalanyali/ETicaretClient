import { ProductModel } from "./product.model";

export class OrderItemModel{
    id:string="";
    orderId:string="";
    productId:string = "";
    product:ProductModel;
    quantity:number = 0;
    totalPrice:number = 0;    
}