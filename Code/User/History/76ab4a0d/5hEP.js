import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode : "light",
    user : null,
    token : null,
    posts : [],
    subGreddiits : [],
    currentSubG : null,
    //!Why was posts added here?
    //*Because of changes to frontend that need to be reflected without a reload.
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setMode : ( state ) => {
            state.mode = ( state.mode === "light" ? "dark" : "light");
        },
        setLogin : (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state) =>{
            state.user = null;
            state.token = null;
            console.log("Signed Out");
        },
        setPosts : (state,action)=>{
            state.posts = action.payload.posts;
        },
        setSubGreddiits : (state,action)=>{
            state.subGreddiits = action.payload.subGreddiits;
        },
        setCurrentSubG : (state, action)=>{
            state.currentSubG = action.payload.currentSubG;
        }
    }
})

export const { setMode, setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;