import axios from "axios";
import { create } from "zustand"
import {toast} from "react-toastify"
export const useAuthStore = create((set) => ({
authUser: null,
isCheckingAuth: true,
 checkAuth: async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/checkauth");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
                 const response = await axios.post( 
                   "http://localhost:8000/api/v1/login",
                   { email, password },
                   { withCredentials: true }
                 );
                 console.log(response.data)
                 set({ authUser: response.data.user });
                 toast.success("Logged in successfully"); 
               } catch (error) {
                 console.error("Login Error:", error.response ? error.response.data : error.message);
               }
    },
}))

