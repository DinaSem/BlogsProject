import {applyMiddleware, combineReducers, createStore} from 'redux'
import {BlogsActionsType, blogsReducer} from "../blogs/blogs-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunkMiddleware from 'redux-thunk'
import {postsReducer} from "../posts/post-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    blogs: blogsReducer,
    posts: postsReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk = ThunkAction<void, AppRootStateType, unknown, AppActionType>

export type AppActionType = BlogsActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
