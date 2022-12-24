import {BlogsPostsGetResponseDataType} from "../api/blogs-api";
import {usersApi, UsersGetResponseDataType, UserType} from "../api/users-api";
import {AppThunk} from "../api/store";
import {setAppErrorAC, setAppStatusAC, setAppSuccessAC} from "../app/app-reducer";
import {ErrorsMessagesType} from "../api/posts-api";
import axios, {AxiosError} from "axios";

//TODO...
const initialState = {
    usersData: {} as UsersGetResponseDataType,
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    user: {} as UserType,
    blogsPostsData: {} as BlogsPostsGetResponseDataType,
    params: {
        pageNumber: 1,
        pageSize: 10,
        sortBy: '',
        sortDirection: '',
        searchLoginTerm: '',
        searchEmailTerm: '',
    }
}

export const usersReducer = (state: InitialStateType = initialState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case "USERS/SET-USERS":
            return {...state, usersData: action.usersData}
        case "USERS/SET-USERS-PAGE-NUMBER":
            return {
                ...state, params: {
                    ...state.params, pageNumber: action.pageNumber
                }
            }
        case "USERS/SET-SIZE-OF-USERS-PAGE":
            return {
                ...state, params: {
                    ...state.params, pageSize: action.pageSize
                }
            }
        case "USERS/REMOVE-USER":
            return {
                ...state, usersData: {
                    ...state.usersData,
                    items: state.usersData.items.filter(u => u.id !== action.id)
                }
            }
        case "USERS/ADD-USER":
            return {...action.user, ...state}

        // case "BLOGS/SET-BLOG-DETAILS":
        //     return {...state, blog: action.blog}
        // case "BLOGS/SET-BLOGS-POSTS":
        //     return {...state, blogsPostsData: action.blogsPostsData}
        // case "BLOGS/SET-SEARCH-NAME-TERM":
        //     return {...state, params: {...state.params, searchNameTerm: action.title}}
        // case "BLOGS/CHANGE-BLOG":
        //     return {
        //         ...state, blogsData: {
        //             ...state.blogsData,
        //             items: state.blogsData.items.filter(b => b.id === action.blogId ? {
        //                 ...b,
        //                 name: action.name,
        //                 websiteUrl: action.websiteUrl,
        //                 description: action.description
        //             } : b)
        //         }
        //     }
        // case "BLOGS/CHANGE-SORT-DIRECTION-BLOG":
        //     return {...state, params: {...state.params, sortDirection: action.sortDirection, sortBy: action.sortBy}}
        // // case "BLOGS/SORT-BY-BLOG":
        // //     return {...state, sortBy: action.sortBy}
        // case "BLOGS/SET-BLOG-ID":
        //     return {...state, currentBlogId: action.blogId}
        // case "BLOGS/SET-PAGE-NUMBER-OF-BLOGS":
        //     return {...state, params: {
        //         ...state.params, pageNumber: action.pageNumber}
        //     }

        default:
            return state
    }
}

// actions

export const setUsersAC = (usersData: UsersGetResponseDataType) => ({type: 'USERS/SET-USERS', usersData} as const)
export const setPageOfUsersAC = (pageNumber: number) => ({type: 'USERS/SET-USERS-PAGE-NUMBER', pageNumber} as const)
export const setSizeOfUsersPageAC = (pageSize: number) => ({type: 'USERS/SET-SIZE-OF-USERS-PAGE', pageSize} as const)
export const removeUserAC = (id: string) => ({type: 'USERS/REMOVE-USER', id} as const)
export const addUserAC = (user: UserType) => ({type: 'USERS/ADD-USER', user} as const)

// export const setBlogDetailsAC = (blog: BlogType, id: string) => ({type: 'BLOGS/SET-BLOG-DETAILS', blog, id} as const)
// export const setBlogsPostsAC = (blogsPostsData: BlogsPostsGetResponseDataType, id: string) => ({
//     type: 'BLOGS/SET-BLOGS-POSTS',
//     blogsPostsData,
//     id
// } as const)
// export const setSearchNameTermAC = (title: string) => ({type: 'BLOGS/SET-SEARCH-NAME-TERM', title} as const)
// export const addBlogAC = (blog: BlogType) => ({type: 'BLOGS/ADD-BLOG', blog} as const)

// export const changeBlogAC = (blogId: string, name?: string, websiteUrl?: string, description?: string) => ({
//     type: 'BLOGS/CHANGE-BLOG',
//     blogId,
//     name,
//     websiteUrl, description
// } as const)
// export const sortDirectionBlogsAC = (sortDirection: string, sortBy: string) => ({
//     type: 'BLOGS/CHANGE-SORT-DIRECTION-BLOG',
//     sortDirection, sortBy
// } as const)
// // export const sortByBlogsAC = (sortBy: string) => ({
// //     type: 'BLOGS/SORT-BY-BLOG',
// //     sortBy
// // } as const)
// export const setCurrentBlogIdAC = (blogId: string) => ({
//     type: 'BLOGS/SET-BLOG-ID',
//     blogId
// } as const)

//
//
// thunks
export const fetchUsersTC = (): AppThunk =>
    async (dispatch, getState) => {
        const params = getState().users.params
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await usersApi.getUsers(params)
            console.log('from fetchUsersTC')
            dispatch(setUsersAC(res.data))
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
export const removeUserTC = (id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await usersApi.deleteUser(id)
        dispatch(removeUserAC(id))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('Blog has deleted'))
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
export const addUserTC = (login: string, password: string, email: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await usersApi.createUser(login, password, email)
        dispatch(addUserAC(res.data.item))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('Blog has added'))

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

// export const fetchBlogDetailsTC = (id: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await blogsApi.getBlogDetail(id)
//         dispatch(setBlogDetailsAC(res.data, id))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<ErrorsMessagesType>
//         if (axios.isAxiosError(err)) {
//             const error = err.response?.data
//                 ? err.response.data.errorsMessages[0].message
//                 : err.message;
//             dispatch(setAppErrorAC(error))
//         }
//         dispatch(setAppStatusAC('failed'))
//     }
// }
// export const fetchBlogDetailsAndPostsTC = (id: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await blogsApi.getBlogsPosts(id)
//         dispatch(setBlogsPostsAC(res.data, id))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<ErrorsMessagesType>
//         if (axios.isAxiosError(err)) {
//             const error = err.response?.data
//                 ? err.response.data.errorsMessages[0].message
//                 : err.message;
//             dispatch(setAppErrorAC(error))
//         }
//         dispatch(setAppStatusAC('failed'))
//     }
// }

//

//
// export const changeBlogTC = (blogId: string, name?: string, websiteUrl?: string, description?: string): AppThunk =>
//     async dispatch => {
//         dispatch(setAppStatusAC('loading'))
//         try {
//             const res = await blogsApi.updateBlog(blogId, name, websiteUrl, description)
//             dispatch(changeBlogAC(blogId, name, websiteUrl, description))
//             dispatch(setAppStatusAC('succeeded'))
//             dispatch(setAppSuccessAC('Blog has updated'))
//
//         } catch (e) {
//             const err = e as Error | AxiosError<ErrorsMessagesType>
//             if (axios.isAxiosError(err)) {
//                 const error = err.response?.data
//                     ? err.response.data.errorsMessages[0].message
//                     : err.message;
//                 dispatch(setAppErrorAC(error))
//             }
//             dispatch(setAppStatusAC('failed'))
//         }
//     }

// types
type InitialStateType = typeof initialState
export type SetUsersACType = ReturnType<typeof setUsersAC>;
export type SetPageOfUsersACType = ReturnType<typeof setPageOfUsersAC>;
export type SetSizeOfUsersPageACType = ReturnType<typeof setSizeOfUsersPageAC>;
export type RemoveUserACType = ReturnType<typeof removeUserAC>;
export type AddUserACType = ReturnType<typeof addUserAC>;

// export type SetBlogDetailsType = ReturnType<typeof setBlogDetailsAC>;
// export type SetBlogsPostsType = ReturnType<typeof setBlogsPostsAC>;
// export type SetSearchNameTermACType = ReturnType<typeof setSearchNameTermAC>;
// export type ChangeBlogACType = ReturnType<typeof changeBlogAC>;
// export type SortDirectionType = ReturnType<typeof sortDirectionBlogsAC>;
// // export type SortByBlogsType = ReturnType<typeof sortByBlogsAC>;
// export type SetCurrentBlogIdACType = ReturnType<typeof setCurrentBlogIdAC>;


export type UsersActionsType =
    | SetUsersACType
    | SetPageOfUsersACType
    | SetSizeOfUsersPageACType
    | RemoveUserACType
    | AddUserACType
// | SetBlogDetailsType
// | SetBlogsPostsType
// | SetSearchNameTermACType
// | ChangeBlogACType
// | SortDirectionType
// // | SortByBlogsType
// | SetCurrentBlogIdACType
// | StatusActionsType


// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
//     entityStatus: RequestStatusType
// }

