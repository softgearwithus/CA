// src/store/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  // ✅ Login
  login: async (email, password) => {
    try {
      set({ isLoading: true });

      const res = await axios.post(
        "https://ca-backend-tau.vercel.app/api/admin/verify",
        { email, password },
        { withCredentials: true } 
      );

      if (!res.data.success) throw new Error(res.data.message || "Login failed");

      // Save token & user to localStorage
      localStorage.setItem("admin_token", res.data.token);
      localStorage.setItem("admin_user", JSON.stringify({ email: res.data.email }));

      set({
        user: { email: res.data.email },
        token: res.data.token,
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      console.error("Login error:", err.message);
      return { success: false, error: err.message };
    }
  },

  // ✅ Check Auth (persist login on refresh)
  checkAuth: () => {
    try {
      const token = localStorage.getItem("admin_token");
      const userJSON = localStorage.getItem("admin_user");
      const user = userJSON ? JSON.parse(userJSON) : null;

      if (token && user) {
        set({ token, user });
      } else {
        set({ token: null, user: null });
      }
    } catch (error) {
      console.log("Auth check failed", error);
    }
  },

  // ✅ Logout
  logout: () => {
    try {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      set({ user: null, token: null });
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  },
}));
