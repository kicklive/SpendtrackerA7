export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    role: string;
    exp: number;
    iat: number;

}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string;
    name?: string;
    role?: string;
}
