import {blogsApi, BlogsGetResponseDataType, BlogsRequestType,} from "../api/blogs-api";
import {Dispatch} from "redux";
import {postsApi, PostsGetResponseDataType, PostType} from "../api/posts-api";

// const initialState: Array<BlogsType> = []

const initialState = {
    postsData: {} as PostsGetResponseDataType,
    pageNumber: '1',
    pageSize: '1',
    searchNameTerm: '',
    post:{} as PostType

}

// export const blogsReducer = (state: Array<BlogsType> = initialState, action: ActionsType): Array<BlogsType> => {
export const postsReducer = (state: InitialStateType = initialState, action: BlogsActionsType): InitialStateType => {
    switch (action.type) {
        case "POSTS/SET-POSTS":
            return {...state, postsData: action.postsData}
        case "POSTS/SET-POST-DETAILS":
            return {...state, post: action.post}
        default:
            return state
    }
}

// actions

export const setPostsAC = (postsData: PostsGetResponseDataType) => ({type: 'POSTS/SET-POSTS', postsData} as const)
export const setPostDetailsAC = (post: PostType,id:string) => ({type: 'POSTS/SET-POST-DETAILS', post,id} as const)

// thunks
export const fetchPostsTC = (params: { pageNumber?: string; pageSize?: string }) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        postsApi.getPosts(params)
            .then((res) => {
                dispatch(setPostsAC(res.data))
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const fetchPostDetailsTC = (id:string) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        postsApi.getPostDetails(id)
            .then((res) => {
                dispatch(setPostDetailsAC(res.data, id))
                console.log('postDetail', res.data.items)
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
// export const removeTodolistTC = (todolistId: string) => {
//     return (dispatch: ThunkDispatch) => {
//         //изменим глобальный статус приложения, чтобы вверху полоса побежала
//         dispatch(setAppStatusAC('loading'))
//         //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//         dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todolistId))
//                 //скажем глобально приложению, что асинхронная операция завершена
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }
// export const addTodolistTC = (title: string) => {
//     return (dispatch: ThunkDispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.createTodolist(title)
//             .then((res) => {
//                 dispatch(addTodolistAC(res.data.data.item))
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }
// export const changeTodolistTitleTC = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC(id, title))
//             })
//     }
// }

// types
type InitialStateType = typeof initialState
export type SetBlogsType = ReturnType<typeof setPostsAC>;
export type SetBlogDetailsType = ReturnType<typeof setPostDetailsAC>;
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type BlogsActionsType =
    | SetBlogsType
    | SetBlogDetailsType
//     | AddTodolistActionType
//     | ReturnType<typeof changeTodolistTitleAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | SetTodolistsActionType
//     | ReturnType<typeof changeTodolistEntityStatusAC>
// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
//     entityStatus: RequestStatusType
// }
type ThunkDispatch = Dispatch<BlogsActionsType>
// | SetAppStatusActionType>
