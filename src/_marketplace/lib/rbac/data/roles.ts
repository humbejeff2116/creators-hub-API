export enum Roles {
    ADMIN = 'admin',
    VENDOR = 'vendor',
    BUYER = 'buyer',
    GUEST = 'guest',
    ANONYMOUS = 'anonymous'
}

export enum Permissions {
    CREATE_RECORD = 'create_record',
    READ_RECORD = 'read_record',
    UPDATE_RECORD = 'update_record',
    DELETE_RECORD = 'delete_record',
}

export interface Role {
    name: string
    permissions: Array<Permissions>
}

export const userRoles: Array<Role> = [
    {
        "name": Roles.ADMIN,
        "permissions": [
            Permissions.CREATE_RECORD,
            Permissions.READ_RECORD,
            Permissions.UPDATE_RECORD,
            Permissions.DELETE_RECORD
        ]
    },
    {
        "name": Roles.VENDOR,
        "permissions": [
            Permissions.CREATE_RECORD,
            Permissions.READ_RECORD,
            Permissions.UPDATE_RECORD,
            Permissions.DELETE_RECORD
        ]
    },
    {
        "name": Roles.BUYER,
        "permissions": [
            Permissions.CREATE_RECORD,
            Permissions.READ_RECORD,
            Permissions.UPDATE_RECORD,
        ]
    },
    {
        "name": Roles.GUEST,
        "permissions": [
            Permissions.READ_RECORD,
        ]
    }
]
