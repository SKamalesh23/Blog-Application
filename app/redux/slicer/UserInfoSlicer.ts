import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User,Blog } from "@/app/page";
import { create } from "node:domain";
export interface _USER{
  user:User;
  blogs:Blog[]
}
interface USER {
  value: _USER ;
  success:string
}
const initialState: USER = {
  value: {user:{
    USER_Id:"",
    USER_FirstName:"",
    USER_Country:"",
    USER_Language:"",
    USER_Gender:"",
    USER_LastName:"",
    USER_Profile:"",
    Username:"",
    total_blogs_count:"",
    followers_count:0
  },
  blogs:[]
},
  success:"INIT"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserAsync.pending, (state) => {
        // state.value = "Pending"
        state.success="PENDING"
        
      })
      .addCase(
        getUserAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.value = action.payload
          state.success="FULFILLED"
        }
      )
      .addCase(
        getUserAsync.rejected,
        (state)=>{
          state.success = "REJECTED"
        }
      )
  },
});
export const getUserAsync = createAsyncThunk("getUser/async", async () => {
  const res = await fetch("/api/getUserProfile");
  const responseData = await res.json();
  return responseData.message as User;
});

export default userSlice.reducer;
