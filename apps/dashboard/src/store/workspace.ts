import { create } from "zustand";

interface WorkspaceCreateState {
  isOpen: boolean;
  setOpen: () => void;
  resetForm: () => void;
}

export const useWorkspaceCreateStore = create<WorkspaceCreateState>()(
  (set) => ({
    isOpen: false,
    setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    resetForm: () => set({ isOpen: false }),
  })
);
