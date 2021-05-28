export interface JwtResponse {
    email: any;
    username: any;
    newPassword: any;
    currentPassword: any;
    id?:number;
    fullName?: string;
    token?: string;
}