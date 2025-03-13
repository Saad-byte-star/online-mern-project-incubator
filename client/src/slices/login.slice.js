import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const user = createAsyncThunk('fetchData', async (loginData) => {
    const response = await fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData) 
    });

    if (!response.ok) {
        throw new Error("Failed to sign up");
    }
    // console.log("This is the Login Response" , await response.json())
    return await response.json();
});


const loginSlice = createSlice({
    name: "Login",
    initialState :{
    data: {},
    loading:false,
    loggedIn : false,
    error:null  
    },
    reducers:{},
    extraReducers: (builder)=>{
     builder
        .addCase(user.pending,(state)=>{
         state.loading= true   
    })
    .addCase(user.fulfilled,(state,action)=>{
        state.loading=false,
        state.loggedIn = true,
        state.data=action.payload
    })
    .addCase(user.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
})   
}
})
export default loginSlice.reducer;