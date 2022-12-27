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
        // case "BLOGS/SET-BLOG-DETAILS":
        //     return {...state, blog: action.blog}
        // case "BLOGS/SET-BLOGS-POSTS":
        //     return {...state, blogsPostsData: action.blogsPostsData}
        // case "BLOGS/SET-SEARCH-NAME-TERM":
        //     return {...state, params: {...state.params, searchNameTerm: action.title}}
        // case 'BLOGS/ADD-BLOG':
        //     return {...action.blog, ...state}
        // case 'BLOGS/REMOVE-BLOG':
        //     return {
        //         ...state, blogsData: {
        //             ...state.blogsData,
        //             items: state.blogsData.items.filter(b => b.id !== action.id)
        //         }
        //     }
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

export const setProfileDataAC = (profileData: DefaultResponseType) => ({type: 'PROFILE/SET-PROFILE-DATA', profileData} as const)
// export const setBlogDetailsAC = (blog: BlogType, id: string) => ({type: 'BLOGS/SET-BLOG-DETAILS', blog, id} as const)
// export const setBlogsPostsAC = (blogsPostsData: BlogsPostsGetResponseDataType, id: string) => ({
//     type: 'BLOGS/SET-BLOGS-POSTS',
//     blogsPostsData,
//     id
// } as const)
// export const setSearchNameTermAC = (title: string) => ({type: 'BLOGS/SET-SEARCH-NAME-TERM', title} as const)
// export const addBlogAC = (blog: BlogType) => ({type: 'BLOGS/ADD-BLOG', blog} as const)
// export const removeBlogAC = (id: string) => ({type: 'BLOGS/REMOVE-BLOG', id} as const)
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
// export const setPageNumberOfBlogsAC = (pageNumber: number) => ({
//     type: 'BLOGS/SET-PAGE-NUMBER-OF-BLOGS',
//     pageNumber
// } as const)


// thunks
export const fetchProfileDataTC = (): AppThunk => async dispatch => {
             dispatch(setAppStatusAC('loading'))
        try {
            const res = await defaultAPI.getDevices()

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
// export const addBlogTC = (name: string, description: string, websiteUrl: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await blogsApi.createBlog(name, description, websiteUrl)
//         dispatch(addBlogAC(res.data.item))
//         dispatch(setAppStatusAC('succeeded'))
//         dispatch(setAppSuccessAC('Blog has added'))
//
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
// export const removeBlogTC = (id: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await blogsApi.deleteBlog(id)
//         dispatch(removeBlogAC(id))
//         dispatch(setAppStatusAC('succeeded'))
//         dispatch(setAppSuccessAC('Blog has deleted'))
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
export type SetProfileDataACType = ReturnType<typeof setProfileDataAC>;
// export type SetBlogDetailsType = ReturnType<typeof setBlogDetailsAC>;
// export type SetBlogsPostsType = ReturnType<typeof setBlogsPostsAC>;
// export type SetSearchNameTermACType = ReturnType<typeof setSearchNameTermAC>;
// export type AddBlogACType = ReturnType<typeof addBlogAC>;
// export type RemoveBlogACType = ReturnType<typeof removeBlogAC>;
// export type ChangeBlogACType = ReturnType<typeof changeBlogAC>;
// export type SortDirectionType = ReturnType<typeof sortDirectionBlogsAC>;
// // export type SortByBlogsType = ReturnType<typeof sortByBlogsAC>;
// export type SetCurrentBlogIdACType = ReturnType<typeof setCurrentBlogIdAC>;
// export type SetPageOfBlogsACType = ReturnType<typeof setPageNumberOfBlogsAC>;

export type ProfileActionsType =
    | SetProfileDataACType
    // | SetBlogDetailsType
    // | SetBlogsPostsType
    // | SetSearchNameTermACType
    // | AddBlogACType
    // | RemoveBlogACType
    // | ChangeBlogACType
    // | SortDirectionType
    // // | SortByBlogsType
    // | SetCurrentBlogIdACType
    // | StatusActionsType
    // | SetPageOfBlogsACType

// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
//     entityStatus: RequestStatusType
// }

