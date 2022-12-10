const initialState: InitialStateType = {
    status: 'idle',
    error: null as null | string,
    success: null as null | string,
}

export const appReducer = (state: InitialStateType = initialState, action: StatusActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
         return {...state, error: action.error}
        case "APP/SET-SUCCESS":
            return {...state, success: action.success}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    success:  string | null
}

export const setAppErrorAC = (error: string | null) => {
    return ({type: 'APP/SET-ERROR', error} as const);
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppSuccessAC = (success: string | null) => ({type: 'APP/SET-SUCCESS', success} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppSuccessACType = ReturnType<typeof setAppSuccessAC>

export type StatusActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppSuccessACType