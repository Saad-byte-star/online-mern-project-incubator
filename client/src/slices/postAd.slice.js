import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Post a new advertisement
export const postAd = createAsyncThunk('postAd', async (postData) => {
    const response = await fetch("http://localhost:5000/api/v1/advertisement", {
        method: "POST",
        body: postData 
    });

    if (!response.ok) {
        throw new Error("Failed to Post Ad!");
    }
    return await response.json();
});

// Edit an existing advertisement
export const editAd = createAsyncThunk('editAd', async ({ adId, updatedData }) => {
    const response = await fetch(`http://localhost:5000/api/v1/advertisement/aid/${adId}`, {
        method: "PUT",
        body: updatedData
    });

    if (!response.ok) {
        throw new Error("Failed to Edit Ad!");
    }
    return await response.json();
});

// Delete an advertisement
export const deleteAd = createAsyncThunk('deleteAd', async (adId) => {
    const response = await fetch(`http://localhost:5000/api/v1/advertisement/aid/${adId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to Delete Ad!");
    }
    return adId;
});

const postAdSlice = createSlice({
    name: "PostAd",
    initialState: {
        data: {},
        loading: false,
        error: null  
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(postAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(postAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(editAd.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(editAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAd.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAd.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data._id === action.payload) {
                    state.data = {}; // Clear data if the deleted ad was in state
                }
            })
            .addCase(deleteAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default postAdSlice.reducer;
