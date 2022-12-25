import axios, {AxiosResponse} from 'axios';

const url = process.env.REACT_APP_BASE_URL

export let instance = axios.create({

    baseURL:'https://nest12.onrender.com/',
    // baseURL: url,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
    }
})

// api
export const authAPI = {
    register(data: RegisterDataType) {
        // return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>
        return instance.post('/auth/registration', data)
    },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data,{withCredentials: true})
    },

    logout() {
        // return instance.post<{},AxiosResponse<{info:string}>>('/auth/me')
        return instance.post('/auth/logout',{},{withCredentials: true})
    },
    me() {
        return instance.get<{},AxiosResponse<MeResponseType>>('/auth/me')
    },
    registration_confirmation(code:string){
        return instance.post<RecoveryPasswordDataType, AxiosResponse<PasswordResponseType>>('/auth/registration-confirmation', {code})
    },
    refreshToken() {
        return instance.post('/auth/refresh-token',)
    },

    // setNewPassword(data: SetNewPasswordType){
    //     return instance.post<SetNewPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', data)
    // },
    // changeProfile(name: string, avatar: string) {
    //     return instance.put('auth/me', {name, avatar})
    // }

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
    password: string
    resetPasswordToken: string
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

