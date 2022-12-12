import {authAPI, LoginDataType} from "../api/auth-api";
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

//thunks
export const loginTC = (data: LoginDataType,): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)

        const accessToken = res.data.accessToken;
        console.log(res.headers)
        localStorage.setItem('jwt_token', accessToken)
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
            // handleServerNetworkError({message: 'неверный логин или пароль'}, dispatch)

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
        //dispatch(loginAC(false))
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
        const res = await authAPI.me()
        dispatch(loginAC(true))
        // dispatch(setProfileAC(res.data));
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
// export const registrationTC = (values: ValuesType) =>(dispatch: AppDispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     authAPI.register({email: values.email, password: values.password})
//         .then(res=>{
//             dispatch(registrationAC(true));
//             alert(`${JSON.stringify(res.data.addedUser.name)} sign up successfully!`)
//         })
//         .catch (err=> {
//             const error = err.response
//                 ? err.response.data.error
//                 : err.message
//             handleServerNetworkError({message: error}, dispatch)
//         }).finally(() => dispatch(setAppStatusAC("idle")))
// }
//
// export const passwordRecoveryTC = (email: { email: string }) => {
//     return (dispatch: AppDispatch) => {
//         dispatch(setAppStatusAC("loading"))
//         const data = {
//             ...email, // кому восстанавливать пароль
//             from: "Yuhee <YuheePlyuhee@gmail.com>", // можно указать разработчика фронта)
//             message: `<div style="background-color: lime; padding: 15px">
//             password recovery link:
//             Forgot your password? That is okay? it happens! Click on the link bellow to reset yor password:
//             <a href='https://tatiankris.github.io/autumn-project/#/new-password/$token$'>link</a></div>`
//             // хтмп-письмо, вместо $token$ бэк вставит токен
//         }
//         authAPI.passwordRecovery(data)
//             .then(res => {
//                 dispatch(changePasswordRecoveryStatusAC(res.data.success, data.email))
//             })
//             .catch(err => {
//                 const error = err.response
//                     ? err.response.data.error
//                     : err.message
//                 handleServerNetworkError({message: error}, dispatch)
//             })
//             .finally(() => dispatch(setAppStatusAC("idle")))
//     }
// }
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

