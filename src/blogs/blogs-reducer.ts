import {
    blogsApi,
    BlogsGetResponseDataType,
    BlogsPostsGetResponseDataType,
    BlogsRequestType,
    BlogType,
} from "../api/blogs-api";
import {Dispatch} from "redux";
import {PostsGetResponseDataType, PostType} from "../api/posts-api";

// const initialState: Array<BlogsType> = []

const initialState = {
    blogsData: {} as BlogsGetResponseDataType,
    pageNumber: 1,
    pageSize: 10,
    pagesCount: 0,
    searchNameTerm: '',
    sortBy: 'desc',
    sortDirection: 'desc',
    blog: {} as BlogType,
    blogsPostsData: {} as BlogsPostsGetResponseDataType,

}

// export const blogsReducer = (state: Array<BlogsType> = initialState, action: ActionsType): Array<BlogsType> => {
export const blogsReducer = (state: InitialStateType = initialState, action: BlogsActionsType): InitialStateType => {
    switch (action.type) {
        case "BLOGS/SET-BLOGS":
            return {...state, blogsData: action.blogsData}
        case "BLOGS/SET-BLOG-DETAILS":
            return {...state, blog: action.blog}
        case "BLOGS/SET-BLOGS-POSTS":
            return {...state, blogsPostsData: action.blogsPostsData}
        case "BLOGS/SET-SEARCH-NAME-TERM":
            return {...state, searchNameTerm: action.value}
        case 'BLOGS/ADD-BLOG':
            return {...action.blog, ...state}
        case 'BLOGS/REMOVE-BLOG':
            return {
                ...state, blogsData: {
                    ...state.blogsData,
                    items: state.blogsData.items.filter(b => b.id !== action.id)
                }
            }
        case "BLOGS/CHANGE-BLOG":
            return {
                ...state, blogsData: {
                    ...state.blogsData,
                    items: state.blogsData.items.filter(b => b.id === action.blogId ? {
                        ...b,
                        name: action.name,
                        websiteUrl: action.websiteUrl,
                        description: action.description
                    } : b)
                }
            }
        case "BLOGS/CHANGE-SORT-DIRECTION-BLOG":
            return {...state, sortDirection: action.sortDirection}
        case "BLOGS/SORT-BY-BLOG":
            return {...state, sortBy: action.sortBy}
        default:
            return state
    }
}

// actions

export const setBlogsAC = (blogsData: BlogsGetResponseDataType) => ({type: 'BLOGS/SET-BLOGS', blogsData} as const)
export const setBlogDetailsAC = (blog: BlogType, id: string) => ({type: 'BLOGS/SET-BLOG-DETAILS', blog, id} as const)
export const setBlogsPostsAC = (blogsPostsData: BlogsPostsGetResponseDataType, id: string) => ({
    type: 'BLOGS/SET-BLOGS-POSTS',
    blogsPostsData,
    id
} as const)
export const setSearchNameTermAC = (value: string) => ({type: 'BLOGS/SET-SEARCH-NAME-TERM', value} as const)
export const addBlogAC = (blog: BlogType) => ({type: 'BLOGS/ADD-BLOG', blog} as const)
export const removeBlogAC = (id: string) => ({type: 'BLOGS/REMOVE-BLOG', id} as const)
export const changeBlogAC = (blogId: string, name: string, websiteUrl: string, description: string) => ({
    type: 'BLOGS/CHANGE-BLOG',
    blogId,
    name,
    websiteUrl, description
} as const)
export const sortDirectionBlogsAC = (sortDirection: string) => ({
    type: 'BLOGS/CHANGE-SORT-DIRECTION-BLOG',
    sortDirection
} as const)
export const sortByBlogsAC = (sortBy: string) => ({
    type: 'BLOGS/SORT-BY-BLOG',
    sortBy
} as const)

// thunks
export const fetchBlogsTC = (params: { searchNameTerm?: string, pageNumber?: number, pageSize?: number, sortBy?: string, sortDirection?: string }) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        blogsApi.getBlogs(params)
            .then((res) => {
                dispatch(setBlogsAC(res.data))
                // console.log(res.data.items)
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const fetchBlogDetailsTC = (id: string) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        blogsApi.getBlogDetail(id)
            .then((res) => {
                // console.log('RESULT BY BLOG:', res.data)
                dispatch(setBlogDetailsAC(res.data, id))
                // console.log(res.data.items)
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
// export const fetchBlogDetailsAndPostsTC = (id: string, params: { searchNameTerm?: string, pageNumber?: string, pageSize?: string, sortBy?: string, sortDirection?: string }) => {
export const fetchBlogDetailsAndPostsTC = (id: string) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        blogsApi.getBlogsPosts(id)
            .then((res) => {
                // console.log('RESULT BY BLOG:', res.data)
                dispatch(setBlogsPostsAC(res.data, id))
                console.log('BLOGS-POSTS', res.data.items)
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addBlogTC = (name: string, description: string, websiteUrl: string) => {
    return (dispatch: ThunkDispatch) => {
        // dispatch(setAppStatusAC('loading'))
        blogsApi.createBlog(name, description, websiteUrl)
            .then((res) => {
                // console.log('RESULT BY BLOG:', res.data)
                dispatch(addBlogAC(res.data.item))
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeBlogTC = (id: string) => {
    return (dispatch: ThunkDispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        // dispatch(setAppStatusAC('loading'))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        // dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        blogsApi.deleteBlog(id)
            .then((res) => {
                dispatch(removeBlogAC(id))
                //скажем глобально приложению, что асинхронная операция завершена
                // dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeBlogTC = (blogId: string, name: string, websiteUrl: string, description: string) => {
    return (dispatch: ThunkDispatch) => {
        blogsApi.updateBlog(blogId, name, websiteUrl, description)
            .then((res) => {
                dispatch(changeBlogAC(blogId, name, websiteUrl, description))
            })
    }
}

// types
type InitialStateType = typeof initialState
export type SetBlogsType = ReturnType<typeof setBlogsAC>;
export type SetBlogDetailsType = ReturnType<typeof setBlogDetailsAC>;
export type SetBlogsPostsType = ReturnType<typeof setBlogsPostsAC>;
export type SetSearchNameTermACType = ReturnType<typeof setSearchNameTermAC>;
export type AddBlogACType = ReturnType<typeof addBlogAC>;
export type RemoveBlogACType = ReturnType<typeof removeBlogAC>;
export type ChangeBlogACType = ReturnType<typeof changeBlogAC>;
export type SortDirectionType = ReturnType<typeof sortDirectionBlogsAC>;
export type SortByBlogsType = ReturnType<typeof sortByBlogsAC>;

export type BlogsActionsType =
    | SetBlogsType
    | SetBlogDetailsType
    | SetBlogsPostsType
    | SetSearchNameTermACType
    | AddBlogACType
    | RemoveBlogACType
    | ChangeBlogACType
    | SortDirectionType
    | SortByBlogsType

// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
//     entityStatus: RequestStatusType
// }
type ThunkDispatch = Dispatch<BlogsActionsType>
// | SetAppStatusActionType>
