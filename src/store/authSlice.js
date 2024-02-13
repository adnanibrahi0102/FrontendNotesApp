import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null,
    token:null,
   
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;
            state.token=action.payload.token;
           
        },
        logout:(state,action)=>{
           state.status=false;
           state.userData=null;
           state.token=null;
        }
    }
})




export const {login,logout}=authSlice.actions;
export default  authSlice.reducer;