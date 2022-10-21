import create from "zustand";

import { persist } from "zustand/middleware";

type AuthStoreType = {
  userProfile: {
    image: string;
  } | null;

  addUser: (user: any) => void;
  removeUser: () => void;
};

const authStore = (set: any): AuthStoreType => ({
  userProfile: null,

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
