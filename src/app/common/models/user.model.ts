import { RoleModel } from "./role.model";
import { StoreModel } from "./store.model";

export class UserModel{
    id:string="";
    fullName:string="";
    userName:string="";
    email:string="";
    storeId:string="";
    store:StoreModel = new StoreModel();
    roleId:string="";
    role:RoleModel = new RoleModel();
}