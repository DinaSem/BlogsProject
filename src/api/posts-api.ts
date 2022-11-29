import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: 'https://nest-blog4.herokuapp.com/',
})

// api
export const postsApi = {
    getPosts(params: PostsGetRequestDataType) {
        return instance.get<PostsGetRequestDataType, AxiosResponse<PostsGetResponseDataType>>('posts', {params});
    },
    getPostDetails(id: string) {
        return instance.get(`posts/${id}`);
    },
    // createTodolist(title: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    // },
    // deleteTodolist(id: string) {
    //     return instance.delete<ResponseType>(`todo-lists/${id}`);
    // },
    // updateTodolist(id: string, title: string) {
    //     return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
    // },
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


// export type BlogsRequestType = {
//     params: BlogsGetRequestDataType
// }

export type PostsGetRequestDataType = {
    pageNumber?: string,
    pageSize?: string,
}

export type PostsGetResponseDataType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    "items": PostType[]
}

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: string,
    "blogName": string,
    "createdAt": string

}
// export type PostsGetResponseDataType = {
//     pagesCount: number,
//     page: number,
//     pageSize: number,
//     totalCount: number,
//     "items": [
//         {
//             id: string,
//             title: string,
//             shortDescription: string,
//             content: string,
//             bloggerId: string,
//             bloggerName: string,
//             addedAt: string,
//             extendedLikesInfo: {
//                 likesCount: number,
//                 dislikesCount: number,
//                 myStatus: string,
//                 newestLikes: [
//                     {
//                         addedAt: string,
//                         userId: string,
//                         login: string
//                     }
//                 ]
//             }
//         }
//     ]
// }

// export type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }
// export type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: D
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
