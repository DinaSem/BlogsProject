import {applyMiddleware, combineReducers, createStore} from 'redux'
import {BlogsActionsType, blogsReducer} from "../blogs/blogs-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunkMiddleware from 'redux-thunk'
import {PostsActionsType, postsReducer} from "../posts/post-reducer";
import {appReducer, SetAppStatusActionType, StatusActionsType} from "../app/app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    blogs: blogsReducer,
    posts: postsReducer,
    app: appReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

export type AppActionsType = BlogsActionsType|PostsActionsType|StatusActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
