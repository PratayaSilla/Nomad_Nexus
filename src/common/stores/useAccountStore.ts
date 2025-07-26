'use client'

import { create } from "zustand";

interface AccountState {
    user: { name: string; email: string, _id : string, avatar : string } | null;
    isLoggedIn: boolean;
    setUser: (user: { name: string; email: string, _id : string, avatar : string }) => void;
    logout: () => void;
  }
  
  export const useAccountStore = create<AccountState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
  }));