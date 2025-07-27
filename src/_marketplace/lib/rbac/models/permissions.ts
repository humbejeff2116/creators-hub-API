import { Roles } from "../data/roles.js";
import { UserRole } from "./role.js";

class UserPermission extends UserRole {
    private permissions;

    constructor() {
        super();
        this.permissions = [];
    }
    
    public getPermissionsByRoleName(roleName: Roles) {
        // const role = roles.roles.find((r) => r.name === roleName);
        const role = this.getRoleByName(roleName); 
        return role ? role.permissions : [];
    }
}

export const userPermission = new UserPermission();