import { BasketItemModel } from "./basketItem.model";

export class BasketModel{
    id:string="";
    userId:string ="";
    totalAmount:number=0;
    basketItems: BasketItemModel[] = [];
}