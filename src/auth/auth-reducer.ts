import {authAPI, LoginDataType, MeResponseType, RegisterDataType} from "../api/auth-api";
import {AppThunk} from "../api/store";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {handleServerNetworkError} from "../common/error-utils";
import axios, {AxiosError} from "axios";
import {ErrorsMessagesType} from "../api/posts-api";

let initialState = {

    isLoggedIn: false,
    isInitialized: false,
    signUp: false,
    recoveryStatus: false,
    email: "",
    newPasswordStatus: false,
    profileData: {} as MeResponseType,
    statusOfConformation:false
}


export type StateType = typeof initialState;

export const authReducer = (state: StateType = initialState, action: AuthActionsType): StateType => {

    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case 'auth/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        case 'auth/SIGN_UP': {
            return {...state, signUp: action.value}
        }
        case 'auth/CHANGE-PR-STATUS': {
            return {...state, recoveryStatus: action.status, email: action.email}
        }
        case 'auth/SET-NEW-PASSWORD': {
            return {...state, newPasswordStatus: action.newPasswordStatus}
        }
        case "auth/SET-PROFILE":
            return {...state, profileData: action.profileData}
        default:
            return state
    }
}

//actions
export const loginAC = (value: boolean,) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        value,
    } as const
}

export const setIsInitializedAC = (value: boolean) => ({type: 'auth/SET-IS-INITIALIZED', value} as const);

export const registrationAC = (value: boolean) => {
    return {
        type: 'auth/SIGN_UP',
        value
    } as const
}

export const changePasswordRecoveryStatusAC = (status: boolean, email: string) => {
    return {
        type: 'auth/CHANGE-PR-STATUS',
        status, email
    } as const
}

export const setNewPasswordAC = (value: boolean) => {
    return {
        type: 'auth/SET-NEW-PASSWORD',
        newPasswordStatus: value
    } as const
}
export const setProfileAC = (profileData: MeResponseType) => {
    return {
        type: 'auth/SET-PROFILE',
        profileData
    } as const
}
export const setStatusOfConformation = (statusOfConformation: boolean) => {
    return {
        type: 'auth/SET-STATUS-CONFORMATION',
        statusOfConformation
    } as const
}


//thunks
export const loginTC = (data: LoginDataType,): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)

        const accessToken = res.data.accessToken;
        // console.log(res.headers)
        localStorage.setItem('jwt_token', accessToken)
        console.log('accessToken from login', accessToken)
        dispatch(loginAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
            // handleServerNetworkError({message: '???????????????? ?????????? ?????? ????????????'}, dispatch)

        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {

        await authAPI.logout()
        localStorage.removeItem('jwt_token')
        dispatch(loginAC(false))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        dispatch(loginAC(false))
        const err = e as Error | AxiosError<ErrorsMessagesType>
        //await authAPI.refreshToken()

        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}
//
export const initializeAppTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        console.log(localStorage.getItem('jwt_token'))
        const res = await authAPI.me()
        dispatch(loginAC(true))
        dispatch(setProfileAC(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        try {
            const res = await authAPI.refreshToken()
            const accessToken = res.data.accessToken;
            localStorage.setItem('jwt_token', accessToken)
            console.log('refresh', accessToken)
        } catch (e) {
            dispatch(loginAC(false))
            if (axios.isAxiosError(err)) {
                const error = err.response?.data
                    ? err.response.data
                    : err.message;
                console.log(error)
                handleServerNetworkError({message: error}, dispatch)
            }
        }

        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
        }

    } finally {
        dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC("idle"))
    }
}

export const registrationTC = (data: RegisterDataType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.register(data)
        dispatch(registrationAC(true));
        // alert(`${JSON.stringify(res.data.addedUser.name)} sign up successfully!`)
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const registration_conformationTC = (code: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.registration_confirmation(code)
        dispatch(registrationAC(true));
        // alert(`${JSON.stringify(res.data.addedUser.name)} sign up successfully!`)
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const registrationConformationTC = (code:string): AppThunk => dispatch => {
    dispatch(setAppStatusAC("loading"))
    // const code = `Click on the link bellow to confirm email:
    //         <a href=https://dinasem.github.io/BlogsProject/#/registration-confirmation/$token$'>link</a></div>`
    // ????????-????????????, ???????????? $token$ ?????? ?????????????? ??????????
    try {
        const res = authAPI.registration_confirmation(code)
        // dispatch(setStatusOfConformation(true))
        // dispatch(changePasswordRecoveryStatusAC(res.data.success, data.email))
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data
                : err.message;
            console.log(error)
            handleServerNetworkError({message: error}, dispatch)
        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//
// export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: AppDispatch) => {
//     dispatch(setAppStatusAC("loading"));
//
//     const data = {
//         password,
//         resetPasswordToken
//     }
//
//     authAPI.setNewPassword(data)
//         .then(() => {
//             dispatch(setNewPasswordAC(true));
//         })
//         .catch(err => {
//             const error = err.response
//                 ? err.response.data.error
//                 : err.message
//             handleServerNetworkError({message: error}, dispatch);
//         })
//         .finally(() => dispatch(setAppStatusAC("idle")));
// }
//
// //types
export type AuthActionsType =
    | ReturnType<typeof loginAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof changePasswordRecoveryStatusAC>
    | ReturnType<typeof setNewPasswordAC>
    | ReturnType<typeof setProfileAC>
    | ReturnType<typeof setStatusOfConformation>

