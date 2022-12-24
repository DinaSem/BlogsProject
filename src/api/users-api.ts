import axios, {AxiosResponse} from "axios";
import {PostType} from "./posts-api";


const instance = axios.create({
    baseURL: 'https://nest12.onrender.com/',
    headers: {
        'Authorization': 'Basic YWRtaW46cXdlcnR5'
    }
})

// api
export const usersApi = {
    getUsers(params: UsersGetRequestDataType) {
        return instance.get<UsersGetRequestDataType, AxiosResponse<UsersGetResponseDataType>>('users', {params});
    },
    deleteUser(usersId: string) {
        return instance.delete(`users/${usersId}`);
    },
    createUser(login: string, password: string, email: string) {
        return instance.post<{ login: string, password: string, email: string}, AxiosResponse<{ item: UserType }>>('users', {login,password,email});
    },

    // getBlogDetail(blogId: string) {
    //     return instance.get<BlogType>(`blogs/${blogId}`);
    // },
    // getBlogsPosts(blogId: string) {
    //     return instance.get<string, AxiosResponse<BlogsPostsGetResponseDataType>>(`blogs/${blogId}/posts`);
    // },

    // updateBlog(blogId: string, name?: string, websiteUrl?: string, description?:string) {
    //     return instance.put<{ name: string, websiteUrl: string, description:string}, AxiosResponse<ResponseType>>(`blogs/${blogId}`, {name, websiteUrl,description});
    // },
}

// types
export type UsersGetRequestDataType = {
    pageNumber?: number,
    pageSize?: number,
    sortBy?: string
    sortDirection?: string
    searchLoginTerm?:string
    searchEmailTerm?:string
}

export type UsersGetResponseDataType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserType[]
}

export type UserType = {
    id: string,
    login: string,
    email: string
    createdAt: string
}

// export type BlogsPostsGetResponseDataType = {
//     pagesCount: number,
//     page: number,
//     pageSize: number,
//     totalCount: number,
//     items: PostType[]
// }
// // export type ResponseType<D = {}> = {
// //     resultCode: number
// //     messages: Array<string>
// //     fieldsErrors: Array<string>
// //     data: D
// // }
// // export type TodolistType = {
// //     id: string
// //     title: string
// //     addedDate: string
// //     order: number
// // }
//
// //
// //
// // export enum TaskStatuses {
// //     New = 0,
// //     InProgress = 1,
// //     Completed = 2,
// //     Draft = 3
// // }
// //
// // export enum TaskPriorities {
// //     Low = 0,
// //     Middle = 1,
// //     Hi = 2,
// //     Urgently = 3,
// //     Later = 4
// // }
// //
// // export type TaskType = {
// //     description: string
// //     title: string
// //     status: TaskStatuses
// //     priority: TaskPriorities
// //     startDate: string
// //     deadline: string
// //     id: string
// //     todoListId: string
// //     order: number
// //     addedDate: string
// // }
// // export type UpdateTaskModelType = {
// //     title: string
// //     description: string
// //     status: TaskStatuses
// //     priority: TaskPriorities
// //     startDate: string
// //     deadline: string
// // }
// // type GetTasksResponse = {
// //     error: string | null
// //     totalCount: number
// //     items: TaskType[]
// // }
