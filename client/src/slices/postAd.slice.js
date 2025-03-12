import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postAd = createAsyncThunk('postAd', async (postData) => {
    const response = await fetch("http://localhost:5000/api/v1/advertisement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData) 
    });

    if (!response.ok) {
        throw new Error("Failed to Post Ad!");
    }
    // console.log("This is the Login Response" , await response.json())
    return await response.json();
});


const postAdSlice = createSlice({
    name: "PostAd",
    initialState :{
    data: [],
    loading:false,
    error:null  
    },
    reducers:{},
    extraReducers: (builder)=>{
     builder
        .addCase(postAd.pending,(state)=>{
         state.loading= true   
    })
    .addCase(postAd.fulfilled,(state,action)=>{
        state.loading=false,
        state.data=action.payload
    })
    .addCase(postAd.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
})   
}
})
export default postAdSlice.reducer;