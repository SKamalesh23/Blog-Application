import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Blog,User } from "@/app/page";


interface BlogState{
    value:Blog[]
    // user:User
}
const initialState :BlogState = {
    value : [],
    // user:{}
}

const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
        setBlogs : (state ,action:PayloadAction<Blog>)=>{
            state.value.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(getBlogsAsync.pending,()=>{
            console.log("Blogs Load Pending...")
        })
        .addCase(getBlogsAsync.fulfilled,(state,action:PayloadAction<Blog[]>)=>{
            state.value = action.payload
        })
    },
})

export const getBlogsAsync = createAsyncThunk(
    "blogs/getBlogsAsync",
    async()=>{
        const res = await fetch("/api/getHomeBlogs")
        const resBlogs = await res.json()
        
        return resBlogs.message as Blog[]
    }
)
export const {setBlogs} = blogSlice.actions;
export default blogSlice.reducer;