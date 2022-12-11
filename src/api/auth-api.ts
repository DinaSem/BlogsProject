import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: 'https://nest12.onrender.com/',
    // headers: {
    //     'Authorization': 'Basic YWRtaW46cXdlcnR5'
    // }
})

// api
export const authAPI = {
    // register(data: RegisterDataType) {
    //     // return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>
    //     return instance.post('auth/registeration', data)
    // },
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginResponseType>>('auth/login', data)
    },
    logout() {
        // return instance.post<{},AxiosResponse<{info:string}>>('/auth/me')
        return instance.post('/auth/logout')
    },
    me() {
        // return instance.get<{},AxiosResponse<LoginResponseType>>('/auth/me')
        return instance.get('/auth/me')
    },
    // passwordRecovery(data:RecoveryPasswordDataType){
    //     return instance.post<RecoveryPasswordDataType, AxiosResponse<PasswordResponseType>>('auth/forgot', data)
    // },
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

// export type RegisterDataType = {
//     login:string,
//     password: string
//     email: string,
// }

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

export type ProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    error?: string
}

