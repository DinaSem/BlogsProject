import axios, {AxiosResponse} from "axios";
import {PostType} from "./posts-api";


const instance = axios.create({
    baseURL:'https://nest-test-blog4412.vercel.app/',
    headers: {
        'Authorization': 'Basic YWRtaW46cXdlcnR5'
    }
})

// api
export const blogsApi = {
    getBlogs(params: BlogsGetRequestDataType) {
        return instance.get<BlogsGetRequestDataType, AxiosResponse<BlogsGetResponseDataType>>('blogs', {params});
    },
    getBlogDetail(blogId: string) {
        return instance.get<BlogType>(`blogs/${blogId}`);
    },
    getBlogsPosts(blogId: string) {
        return instance.get<string, AxiosResponse<BlogsPostsGetResponseDataType>>(`blogs/${blogId}/posts`);
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        return instance.post<{ name: string, youtubeUrl:string}, AxiosResponse<{ item: BlogType }>>('blogs', {name,description,websiteUrl});
    },
    deleteBlog(blogId: string) {
        return instance.delete(`blogs/${blogId}`);
    },
    updateBlog(blogId: string, name?: string, websiteUrl?: string, description?:string) {
        return instance.put<{ name: string, websiteUrl: string, description:string}, AxiosResponse<ResponseType>>(`blogs/${blogId}`, {name, websiteUrl,description});
    },
}

// types
export type BlogsGetRequestDataType = {
    pageNumber?: number,
    pageSize?: number,
    searchNameTerm?: string
    sortBy?: string
    sortDirection?: string
}

export type BlogsGetResponseDataType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogType[]
}

export type BlogType = {
    id: string,
    name: string,
    websiteUrl: string
    description:string
    createdAt: string
}
export type BlogsPostsGetResponseDataType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostType[]
}
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
// }
// export type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }

//
//
// export enum TaskStatuses {
//     New = 0,
//     InProgress = 1,
//     Completed = 2,
//     Draft = 3
// }
//
// export enum TaskPriorities {
//     Low = 0,
//     Middle = 1,
//     Hi = 2,
//     Urgently = 3,
//     Later = 4
// }
//
// export type TaskType = {
//     description: string
//     title: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
//     id: string
//     todoListId: string
//     order: number
//     addedDate: string
// }
// export type UpdateTaskModelType = {
//     title: string
//     description: string
//     status: TaskStatuses
//     priority: TaskPriorities
//     startDate: string
//     deadline: string
// }
// type GetTasksResponse = {
//     error: string | null
//     totalCount: number
//     items: TaskType[]
// }
