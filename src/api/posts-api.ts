import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL:'https://nest-test-blog4412.vercel.app/',
    headers: {
        'Authorization': 'Basic YWRtaW46cXdlcnR5',
    }
})

// api
export const postsApi = {
    getPosts(params: PostsGetRequestDataType) {
        return instance.get<PostsGetRequestDataType, AxiosResponse<PostsGetResponseDataType>>('posts', {params});
    },
    getPostDetails(postId: string) {
        return instance.get<PostType>(`posts/${postId}`);
    },
    deletePost(postId: string) {
        return instance.delete(`posts/${postId}`);
    },
    createPost(blogId:string, title: string, shortDescription: string, content: string,) {
        return instance.post<{title: string, shortDescription: string, content: string},AxiosResponse<ResponseType<{ item: PostType }>>>(`posts`, {blogId,title,shortDescription,content});
    },
    updatePost(postId:string, blogId:string,title: string, shortDescription: string, content: string,) {
        return instance.put<{postId:string, blogId:string,title: string, shortDescription: string, content: string},AxiosResponse<ResponseType<{ item: PostType }>>>(`posts/${postId}`, {blogId,title,shortDescription,content});
    }
}

// types


export type PostsGetRequestDataType = {
    pageNumber?: string,
    pageSize?: string,
}

export type PostsGetResponseDataType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostType[]
}

export type PostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogName: string,
    createdAt: string
    blogId: string,
    extendedLikesInfo?: {
        likesCount: number,
        dislikesCount: number,
        myStatus: "None || Like || Dislike",
        newestLikes: [
            {
                addedAt: string,
                userId: string,
                login: string
            }
        ]
    }
}
export type ErrorsMessagesType={
    "errorsMessages": [
        {
            "message": "string",
            "field": "string"
        }
    ],
}

export type ResponseType<D = {}> = {
   errors:ErrorsMessagesType,
    data: D
}
//}
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
