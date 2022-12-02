import axios, {AxiosResponse} from "axios";
import {PostsGetResponseDataType, PostType} from "./posts-api";


const instance = axios.create({
    baseURL: 'https://nest12.onrender.com/',
    headers: {
        'Authorization': 'Basic YWRtaW46cXdlcnR5'
    }
})

// api

export const blogsApi = {
    getBlogs(params: BlogsGetRequestDataType) {
        return instance.get<BlogsGetRequestDataType, AxiosResponse<BlogsGetResponseDataType>>('blogs', {params});
        // return instance.get('blogs', {params});
    },
    getBlogDetail(blogId: string) {
        return instance.get(`blogs/${blogId}`);
        // return instance.get('blogs', {params});
    },
    getBlogsPosts(blogId: string) {
        return instance.get<string, AxiosResponse<BlogsPostsGetResponseDataType>>(`blogs/${blogId}/posts`);
        // return instance.get('blogs', {params});
    },
    createBlog(name: string, description: string, websiteUrl: string) {
        return instance.post<{ name: string, youtubeUrl:string}, AxiosResponse<{ item: BlogType }>>('blogs', {name,description,websiteUrl});
        // return instance.post<{ name: string, youtubeUrl:string}, AxiosResponse<ResponseType<{ item: BlogType }>>>('todo-lists', {name,youtubeUrl});
    },
    deleteBlog(blogId: string) {
        return instance.delete(`blogs/${blogId}`);
    },
    updateBlog(blogId: string, name?: string, websiteUrl?: string, description?:string) {
        return instance.put<{ name: string, websiteUrl: string, description:string}, AxiosResponse<ResponseType>>(`blogs/${blogId}`, {name, websiteUrl,description});
    },
    // getTasks(todolistId: string) {
    //     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    // },
    // deleteTask(todolistId: string, taskId: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    // },
    // createTask(todolistId: string, title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    // },
    // updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    //     return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    // }
}

// types


export type BlogsRequestType = {
    params: BlogsGetRequestDataType
}

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
