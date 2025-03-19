import axios from "axios";
import { create } from "zustand"
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
}))