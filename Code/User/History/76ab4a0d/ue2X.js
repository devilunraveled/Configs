import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode : "light",
    user : null,
    token : null,
    posts : [],
    subGreddiits : [],
    currentSubGreddiit : null,
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
        setCurrentSubGreddiit : (state, action)=>{
            state.currentSubGreddiit = action.payload.currentSubGreddiit;
        }
    }
})

export const { setMode, setLogin, setLogout, setPosts, setSubGreddiits, setCurrentSubGreddiit} = authSlice.actions;
export default authSlice.reducer;