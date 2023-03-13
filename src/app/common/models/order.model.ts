import { AddressModel } from "./address.model";
import { BasketItemModel } from "./basketItem.model";
import { OrderItemModel } from "./order-item.model";
import { PaymentTypeModel } from "./payment-type.model";

export class OrderModel{
    id:string="";
    addressId:string="";
    address:AddressModel;
    paymentTypeId:string="";
    paymentType:PaymentTypeModel;
    userId:string="";
    orderItems:OrderItemModel[] = [];
    createdDate:string="";

    cardHolderName:string ="";
    cardNumber:string ="";
    cvv:string ="";
    expireMonth:string ="";
    expireYear:string ="";

    basketId:string ="";
}