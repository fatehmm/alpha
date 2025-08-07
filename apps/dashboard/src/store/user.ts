import { create } from "zustand";

interface UserCreateState {
  isOpen: boolean;
  setOpen: () => void;
  resetForm: () => void;
}

export const useUserCreateStore = create<UserCreateState>()((set) => ({
  isOpen: false,
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  resetForm: () => set({ isOpen: false }),
}));
