export interface loginUser {
//   [x: string]: any;
    username: string,
    password: string,
    jwtToken: string
}

export interface registerUser {
    email: string;
    username: string;
    password: string;
}