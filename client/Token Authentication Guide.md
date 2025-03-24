# Understanding Async Thunks for Editing and Deleting Advertisements

This guide will help you understand how asynchronous thunks work in Redux Toolkit for editing and deleting advertisements. We will walk through each line of code with detailed explanations.

---

## Overview

In this example, we use `createAsyncThunk` from Redux Toolkit to create asynchronous actions for:
- **Editing an Advertisement** (using a PUT request)
- **Deleting an Advertisement** (using a DELETE request)

These thunks handle the API calls, error responses, and even log the user out if the session (token) has expired.

---

## Code: Edit Advertisement

```javascript
// Create an asynchronous thunk for editing an advertisement
export const editAd = createAsyncThunk(
  'editAd', // This is the action type string for the thunk.
  async ({ adId, updatedData, token }, { rejectWithValue, dispatch }) => {
    try {
      // Make a PUT request to update the advertisement using its ID (adId)
      const response = await fetch(`http://localhost:5000/api/v1/advertisement/aid/${adId}`, {
        method: "PUT", // Using PUT because we are updating data.
        headers: {
          // Send the authentication token with the request in the header called "X-Auth-Token".
          "X-Auth-Token": token
        },
        // The updated advertisement data. This can be FormData if you're sending files,
        // or a JSON string if you're sending JSON data.
        body: updatedData
      });

      // Check if the server did NOT send back a successful response (status 2xx).
      if (!response.ok) {
        // Extract the error message from the response body, which is assumed to be in JSON format.
        const errorData = await response.json();

        // If the error message indicates that the session has expired, dispatch the logout action.
        if (errorData.message === "session expired") {
          dispatch(logout()); // Log the user out by clearing their login state.
        }

        // Return the error message so that it can be handled in your reducers.
        return rejectWithValue(errorData.message);
      }

      // If the response is successful, convert the response body to JSON and return it.
      return await response.json();
    } catch (error) {
      // If an unexpected error occurs (e.g., network issues), return that error message.
      return rejectWithValue(error.message);
    }
  }
);


// useNavigate hook gives you a function to navigate programmatically.
const navigate = useNavigate();

// useSelector extracts the "error" property from the PostAd state in Redux.
const { error } = useSelector((state) => state.PostAd);

// useEffect runs whenever "error" (or "navigate") changes.
useEffect(() => {
  // Check if the error message indicates that the session has expired.
  if (error === "session expired") {
    // Alert the user that their session has expired.
    alert("Your session has expired. Please log in again.");
    // Redirect the user to the home page (or login page).
    navigate("/");
  }
}, [error, navigate]); // Dependency array: re-run effect if error or navigate changes.


// Function to handle the deletion of an advertisement.
const handleDelete = (adId) => {
  // Dispatch the deleteAd thunk, passing an object with the advertisement id and the token.
  dispatch(deleteAd({ "adId": adId, "token": token }));
};
