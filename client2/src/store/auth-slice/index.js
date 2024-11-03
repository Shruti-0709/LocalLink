import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isAuthenticated: false,
    isLoading:true,
    user:null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData)=>{
        const response=await axios.post('http://localhost:5000/api/auth/register',
            formData,{
                withCredentials : true
            }
        )
        return response.data;
    }
)

export const LoginUser = createAsyncThunk('/auth/login',
    async (formData)=>{
        const response=await axios.post('http://localhost:5000/api/auth/login',
            formData,{
                withCredentials : true
            }
        )
        return response.data;
    }
)

export const LogoutUser = createAsyncThunk('/auth/logout',
    async ()=>{
        const response=await axios.post('http://localhost:5000/api/auth/logout',
            {
                
            },
            {
                withCredentials : true
            }
        )
        return response.data;
    }
)


export const checkAuth = createAsyncThunk(
    '/auth/checkauth',
    async ()=> {
        const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                'Cache-control': 'no-store,no-cache, must-revalidate,proxy-revalidate',
                Expires: '0'
            }
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;

                // If registration was successful, update the state
                if (action.payload.success) {
                    state.isAuthenticated = true;
                    state.user = action.payload.data;  // Assuming the backend sends user data
                }

            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            }).addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
                console.log("Login pending");
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;

                // If registration was successful, update the state
                if (action.payload.success) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;  // Assuming the backend sends user data
                    console.log("Login fullfilled");
                }
           
            })
            .addCase(LoginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                console.log("Login rejected");
            }).addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                console.log("pending");
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;

                // If registration was successful, update the state
                if (action.payload.success) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;  
                 console.log("fullfilled");
                }
           
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                console.log("rejected");
            })
            .addCase(LogoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;  // Assuming the backend sends user data
                console.log("Logout fullfilled");
                
           
            })
    }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;