export interface UserDetails{
    _id:string,
    email:string,
    name:string,
    exp:number,
    iat:number
}

export interface TokenReponse{
    token:string
}

export interface TokenPayload{
    email:string,
    password:string,
    name?:string
}