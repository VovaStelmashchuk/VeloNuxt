export interface UserEntity {
    id: string
    name: string
    username: string
    roles: string[]
    email?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface UserDto {
    id: string
    name: string
    username: string
    roles: string[]
}

export interface UserSession {
    sessionKey: string
    userId: string
    roles: string[]
}

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]
