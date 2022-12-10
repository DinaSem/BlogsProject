import {ErrorsMessagesType, postsApi, PostsGetResponseDataType, PostType} from "../api/posts-api";
import {AddBlogACType, fetchBlogDetailsAndPostsTC} from "../blogs/blogs-reducer";
import {setAppErrorAC, setAppStatusAC, setAppSuccessAC, StatusActionsType} from "../app/app-reducer";
import {AppRootStateType, AppThunk} from "../api/store";
import axios, {all, AxiosError} from "axios";
import {handleServerNetworkError} from "../common/error-utils";


const initialState = {
    postsData: {} as PostsGetResponseDataType,
    pageNumber: '1',
    pageSize: '1',
    searchNameTerm: '',
    post: {} as PostType

}

export const postsReducer = (state: InitialStateType = initialState, action: PostsActionsType): InitialStateType => {
    switch (action.type) {
        case "POSTS/SET-POSTS":
            return {...state, postsData: action.postsData}
        case "POSTS/SET-POST-DETAILS":
            return {...state, post: action.post}
        case "POSTS/REMOVE-POST":
            return {
                ...state, postsData: {
                    ...state.postsData, items: state.postsData.items.filter(b => b.id !== action.postId)
                }
            }
        case "BLOGS/ADD-BLOG":
            return {...state, [action.blog.id]: []}
        case "POSTS/ADD-POST":
            return {...state, [action.blogId]: [state, ...state.postsData.items]}
        case "POSTS/UPDATE-POST":
            return {

                ...state, postsData: {
                    ...state.postsData,
                    items: state.postsData.items.map(p => p.id === action.id ? {
                        ...p,
                        // ...action.data
                        title: action.title,
                        shortDescription: action.shortDescription,
                        content: action.content
                    } : p)
                }
            }
        default:
            return state
    }
}

// actions

export const setPostsAC = (postsData: PostsGetResponseDataType) => ({type: 'POSTS/SET-POSTS', postsData} as const)
export const setPostDetailsAC = (post: PostType, id: string) => ({type: 'POSTS/SET-POST-DETAILS', post, id} as const)
export const removePostAC = (postId: string) => ({type: 'POSTS/REMOVE-POST', postId} as const)
export const addPostAC = (blogId: string, title: string, shortDescription: string, content: string) => ({
    type: 'POSTS/ADD-POST',
    blogId,
    title,
    shortDescription,
    content
} as const)
export const updatePostAC = (id: string, blogId: string, title: string, shortDescription: string, content: string) => ({
    type: 'POSTS/UPDATE-POST',
    id,
    blogId,
    title,
    shortDescription,
    content
} as const)

// thunks
export const fetchPostsTC = (params: { pageNumber?: string; pageSize?: string } = {}): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await postsApi.getPosts(params)
        dispatch(setPostsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    }
    catch (e) {
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
export const fetchPostDetailsTC = (id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await postsApi.getPostDetails(id)
        dispatch(setPostDetailsAC(res.data, id))
        dispatch(setAppStatusAC('succeeded'))
    }
    catch (e) {
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

export const removePostTC = (postId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await postsApi.deletePost(postId)
        dispatch(removePostAC(postId))
        dispatch(fetchPostsTC({}))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setAppSuccessAC('Post has removed'))
    }
    catch (e) {
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

export const addPostTC = (blogId: string, title: string, shortDescription: string, content: string,): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await postsApi.createPost(blogId, title, shortDescription, content)
            dispatch(addPostAC(blogId, title, shortDescription, content))
            dispatch(fetchPostsTC({}))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppSuccessAC('Post has added'))
        }
        catch (e) {
            const err = e as Error | AxiosError<ErrorsMessagesType>
            if (axios.isAxiosError(err)) {
                const error = err.response?.data
                    ? err.response.data.errorsMessages[0].message
                    : err.message;
                handleServerNetworkError({message: error}, dispatch)
            }
        }
    }
export const changePostTC = (id: string, title: string, shortDescription: string, content: string): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const blogId = getState().blogs.currentBlogId
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await postsApi.updatePost(id, blogId, title, shortDescription, content,)
            dispatch(updatePostAC(id, blogId, title, shortDescription, content))
            dispatch(fetchBlogDetailsAndPostsTC(blogId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppSuccessAC('Post has updated'))
        }
            // .catch((e: AxiosError<{errorsMessages: Array<{field: string, message:string}>}>)=>{

        catch (e) {
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
export type SetBlogsType = ReturnType<typeof setPostsAC>;
export type SetBlogDetailsType = ReturnType<typeof setPostDetailsAC>;
export type RemovePostACType = ReturnType<typeof removePostAC>;
export type AddPostACType = ReturnType<typeof addPostAC>;
export type UpdatePostACType = ReturnType<typeof updatePostAC>;


export type PostsActionsType =
    | SetBlogsType
    | SetBlogDetailsType
    | RemovePostACType
    | AddBlogACType
    | AddPostACType
    | UpdatePostACType
    | StatusActionsType

