import { NextFunction, Request, Response } from "express";
import { Permissions, Roles } from "../data/roles.js";
import { userPermission } from "../models/permissions.js";
import { APIError, HttpStatusCode } from "../../logs/errorHandler.js";
import { JsonWebTokenError } from 'jsonwebtoken';
import { authTokenAndGetAccount } from "../../account-management/middlewares/auth/index.js";




class Rbac {
    async allowPermission(permission: Permissions) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authResponse = await authTokenAndGetAccount(req);
                const account = authResponse.account;
                const userRole = account ? account.role : Roles.ANONYMOUS;
                const userPermissions = userPermission.getPermissionsByRoleName(userRole);
    
                if (userPermissions.includes(permission)) {
                    next();
                } else {
                    next(new APIError('Access denied', HttpStatusCode.FORBIDDEN))
                }
            } catch (err) {
                if (err instanceof JsonWebTokenError) {
                    next(new APIError('Invalid token', HttpStatusCode.UNAUTHORIZED));
                } else {
                    next(err);
                }
            }
        }
    }

    async allowRoles(roles: Array<Roles>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authResponse = await authTokenAndGetAccount(req);
                const account = authResponse.account;
                const userRole = account ? account.role : Roles.ANONYMOUS;
    
                if (roles.length && !roles.includes(userRole)) {
                    next();
                } else {
                    throw new APIError("Access denied", HttpStatusCode.FORBIDDEN);
                }
            } catch (err) {
                if (err instanceof JsonWebTokenError) {
                    next(new APIError('Invalid token', HttpStatusCode.UNAUTHORIZED));
                } else {
                    next(err);
                }
            }
        }
    }
}

const rbac = new Rbac();
export default rbac;

// Example usage
// router.get(
//     '/stores', 
//     rbacMiddleware.allowPermission(Permissions.READ_RECORD), 
//     recordsController.getAllRecords
// );


// Example usage
// router.get(
//     '/store', 
//     rbacMiddleware.allowRoles([Roles.BUYER]),
//     rbacMiddleware.allowPermission(Permissions.READ_RECORD),  
//     recordsController.getAllRecords
// );

