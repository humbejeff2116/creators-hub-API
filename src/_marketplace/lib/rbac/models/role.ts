import { Role, Roles, userRoles } from "../data/roles.js";

export class UserRole {
    private roles: Array<Role>;

    constructor() {
        this.roles = userRoles;
    }

    public getRoleByName(name: Roles) {
        return this.roles.find(role => role.name === name);
    }

    public getRoles() {
        return this.roles;
    }
}

export const userRole = new UserRole();