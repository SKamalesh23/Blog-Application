import {configureStore} from "@reduxjs/toolkit"
import blogslicer from "./slicer/blogSlicer";
import User from "./slicer/UserInfoSlicer"
export const store = configureStore({
    reducer:{
        blogs:blogslicer,
        user:User
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;