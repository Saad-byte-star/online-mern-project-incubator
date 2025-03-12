import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// export const user = createAsyncThunk('fetchData',async()=>{
//     const response = await fetch("http://localhost:5000/api/v1/users/signup");  // NOT POST METHOD 
//     return await response.json();
// })

export const user = createAsyncThunk('fetchData', async (signupData) => {
    const response = await fetch("http://localhost:5000/api/v1/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData) 
    });

    if (!response.ok) {
        throw new Error("Failed to sign up");
    }

    return await response.json();
});


const signupSlice = createSlice({
    name: "Signup",
    initialState :{
    data: [],
    loading:false,
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
        state.data=action.payload
    })
    .addCase(user.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
})   
}
})
export default signupSlice.reducer;