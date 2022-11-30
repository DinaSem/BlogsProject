import {Dispatch} from "redux";
import {postsApi, PostsGetResponseDataType, PostType} from "../api/posts-api";
import {AddBlogACType} from "../blogs/blogs-reducer";

// const initialState: Array<BlogsType> = []

const initialState = {
    postsData: {} as PostsGetResponseDataType,
    pageNumber: '1',
    pageSize: '1',
    searchNameTerm: '',
    post: {} as PostType

}

// export const blogsReducer = (state: Array<BlogsType> = initialState, action: ActionsType): Array<BlogsType> => {
export const postsReducer = (state: InitialStateType = initialState, action: BlogsActionsType): InitialStateType => {
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
            return {...state,[action.blog.id]:[]}
        case "POSTS/ADD-POST":
            return {...state,[action.post.blogId]:[action.post, ...state.postsData.items]}
        default:
            return state
    }
}

// actions

export const setPostsAC = (postsData: PostsGetResponseDataType) => ({type: 'POSTS/SET-POSTS', postsData} as const)
export const setPostDetailsAC = (post: PostType, id: string) => ({type: 'POSTS/SET-POST-DETAILS', post, id} as const)
export const removePostAC = (postId: string) => ({type: 'POSTS/REMOVE-POST', postId} as const)
export const addPostAC = (post: PostType) => ({type: 'POSTS/ADD-POST', post} as const)

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
export const fetchPostDetailsTC = (id: string) => {
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

export const removePostTC = (postId: string) => {
    return (dispatch: ThunkDispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        // dispatch(setAppStatusAC('loading'))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        // dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        postsApi.deletePost(postId)
            .then((res) => {
                dispatch(removePostAC(postId))
                //скажем глобально приложению, что асинхронная операция завершена
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addPostTC = (blogId: string,title: string, shortDescription: string, content: string,) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        postsApi.createPost(blogId,title,shortDescription,content)
            .then((res) => {
                dispatch(addPostAC(res.data.items))
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
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
export type RemovePostACType = ReturnType<typeof removePostAC>;
export type AddPostACType = ReturnType<typeof addPostAC>;


export type BlogsActionsType =
    | SetBlogsType
    | SetBlogDetailsType
    | RemovePostACType
    | AddBlogACType
    | AddPostACType

// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
//     entityStatus: RequestStatusType
// }
type ThunkDispatch = Dispatch<BlogsActionsType>
// | SetAppStatusActionType>
