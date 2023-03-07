import { AddressModel } from "./address.model";
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
}