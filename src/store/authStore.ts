import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  userId: string | null;
  setSession: (token: string, userName: string, userId: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      userId: null,
      setSession: (token, userName, userId) => set({ token, userName, userId }),
      logout: () => set({ token: null, userName: null, userId: null }),
    }),
    {
      name: "itelect4-auth",
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        userId: state.userId,
      }),
    }
  )
);

export default useAuthStore;