import axios, {AxiosResponse} from 'axios';

const url = process.env.REACT_APP_BASE_URL

export let instance = axios.create({

    baseURL:'https://nest-test-blog4412.vercel.app/',
    // baseURL: url,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')}
})

// api
export const authAPI = {
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType,AxiosResponse<ResponseType>>('/auth/registration', data)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data,{withCredentials: true})
    },

    logout() {
        return instance.post('/auth/logout',{},{withCredentials: true})
    },
    me() {
        return instance.get<{},AxiosResponse<MeResponseType>>('/auth/me',{withCredentials: true,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')}})
    },
    registration_confirmation(code:string){
        return instance.post<{code:string}, AxiosResponse<ResponseType>>('/auth/registration-confirmation', {code})
    },
    registration_email_resending(email:string){
        return instance.post<{email:string}, AxiosResponse<ResponseType>>('/auth/registration-email-resending', {email})
    },
    password_recovery(email:string){
        return instance.post<{email:string}, AxiosResponse<ResponseType>>('/auth/password-recovery', {email})
    },
    refreshToken() {
        return instance.post<{}, AxiosResponse<LoginResponseType>>('/auth/refresh-token',{},{withCredentials: true})
    },
    setNewPassword(data: SetNewPasswordType){
        return instance.post<SetNewPasswordType, AxiosResponse<ResponseType>>('/auth/new-password', data)
    },
}

// types
export type LoginDataType = {
    loginOrEmail: string
    password: string
}

export type LoginResponseType = {
    accessToken: string
}

export type RegisterDataType = {
    login:string,
    password: string
    email: string,
}

export type RegisterResponseType = {
    addedUser: any,
    error?: string
}

export type RecoveryPasswordDataType = {
    email: string
    from: string
    message: string
}

export type SetNewPasswordType = {
    newPassword: string,
    recoveryCode: string
}

export type PasswordResponseType = {
    info: string
    error: string
    success: boolean
}

export type MeResponseType = {
    email: string,
    login:string,
    userId:string,
}

// export type ProfileType = {
//     _id: string
//     email: string
//     name: string
//     avatar?: string
//     publicCardPacksCount: number // количество колод
//     created: Date
//     updated: Date
//     isAdmin: boolean
//     error?: string
// }

