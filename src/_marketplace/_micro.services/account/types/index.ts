import { Types } from "mongoose";

type ObjectIdOrString = Types.ObjectId | string;
// TODO... remove duplicate in rbac/data/roles.ts file
export enum Roles {
    ADMIN = 'admin',
    BUYER = 'buyer',
    VENDOR = 'vendor',
    GUEST = 'guest',
    ANONYMOUS = 'anonymous'
}

// account
export interface Account {
    _id?: Types.ObjectId,
    fullName: string,
    email: string,
    userName: string,
    password: string,
    contactNumber?: string,
    profileImage?: string,
    role: Roles,
    active: boolean,
    invalidLoginAttempts: number,
    lockLogin: Date,
    passwordResetReq: number,
    lockResetPassword: Date,
    purchaseHistory: Array<Purchase>
    hasActiveNotification?: boolean
    createdAt?: Date,
}


interface Purchase {
    itemId: ObjectIdOrString 
    timestamp: Date, 
}