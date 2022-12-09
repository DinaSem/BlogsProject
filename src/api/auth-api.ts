
import {AxiosResponse} from 'axios';
import axios from "axios/index";


const instance = axios.create({
    baseURL: 'https://nest12.onrender.com/',
    headers: {
        'Authorization': 'Basic YWRtaW46cXdlcnR5'
    }
})

// api
export const authAPI = {
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>
        ('auth/registeration', data)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('/auth/login', data)
    },
    logout() {
        return instance.post<{},AxiosResponse<{info:string}>>('/auth/me')
    },
    me() {
        return instance.get<{},AxiosResponse<LoginResponseType>>('/auth/me')
    },
    passwordRecovery(data:RecoveryPasswordDataType){
        return instance.post<RecoveryPasswordDataType, AxiosResponse<PasswordResponseType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordType){
        return instance.post<SetNewPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', data)
    },
    changeProfile(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    }

}
// types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    avatar?: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export type RegisterDataType = {
    email: string,
    password: string
}

export type RegisterResponseType = {
    addedUser:any,
    error?: string
}

export type RecoveryPasswordDataType={
    email: string
    from: string
    message: string
}

export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type PasswordResponseType ={
    info:string
    error: string
    success:boolean
}

export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

