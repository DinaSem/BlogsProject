import {blogsApi, BlogsGetResponseDataType, BlogsPostsGetResponseDataType, BlogType,} from "../api/blogs-api";
import {setAppErrorAC, setAppStatusAC, setAppSuccessAC, StatusActionsType} from "../app/app-reducer";
import {AppThunk} from "../api/store";
import axios, {AxiosError} from "axios";
import {ErrorsMessagesType} from "../api/posts-api";
import {defaultAPI, DefaultResponseType} from "../api/default-api";

//TODO change total count
const initialState = {
    profileData: [] as DefaultResponseType,
}


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE-DATA":
            return {...state, profileData: action.profileData}
        case 'PROFILE/REMOVE-DEVICE':
            return {...state, profileData: state.profileData.filter(d => d.deviceId !== action.deviceId)}
        case "PROFILE/REMOVE-ALL-OTHER-DEVICES":
            return {...state, profileData: state.profileData.filter(d => d.deviceId === d.deviceId)}
        default:
            return state
    }
}

// actions
export const setProfileDataAC = (profileData: DefaultResponseType) => ({
    type: 'PROFILE/SET-PROFILE-DATA',
    profileData
} as const)
export const removeDeviceAC = (deviceId: string) => ({type: 'PROFILE/REMOVE-DEVICE', deviceId} as const)
export const removeAllOtherDevicesAC = () => ({type: 'PROFILE/REMOVE-ALL-OTHER-DEVICES'} as const)

// thunks
export const fetchProfileDataTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await defaultAPI.getDevices()
        console.log('status',res.status)
        dispatch(setProfileDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data.errorsMessages[0].message
                : err.message;
            dispatch(setAppErrorAC(error))
        }
        dispatch(setAppStatusAC('failed'))
    }
}
export const removeDeviceTC = (deviceId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await defaultAPI.removeSomeDevice(deviceId)
        dispatch(removeDeviceAC(deviceId))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('Device has deleted'))
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data.errorsMessages[0].message
                : err.message;
            dispatch(setAppErrorAC(error))
        }
        dispatch(setAppStatusAC('failed'))
    }
}
export const removeAllOtherDevicesTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await defaultAPI.removeDevices()
        dispatch(removeAllOtherDevicesAC())
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('Devices have deleted'))
    } catch (e) {
        const err = e as Error | AxiosError<ErrorsMessagesType>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? err.response.data.errorsMessages[0].message
                : err.message;
            dispatch(setAppErrorAC(error))
        }
        dispatch(setAppStatusAC('failed'))
    }
}


// types
type InitialStateType = typeof initialState
export type SetProfileDataACType = ReturnType<typeof setProfileDataAC>;
export type RemoveDeviceACType = ReturnType<typeof removeDeviceAC>;
export type RemoveAllOtherDevicesACType = ReturnType<typeof removeAllOtherDevicesAC>;

export type ProfileActionsType =
    | SetProfileDataACType
    | RemoveDeviceACType
    | RemoveAllOtherDevicesACType

