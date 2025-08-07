import { create } from "zustand";

interface ActionConfirmState {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText: string;
  onConfirm: (() => void) | null;
  setOpen: (config: {
    title: string;
    content: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void;
  resetForm: () => void;
}

export const useActionConfirmStore = create<ActionConfirmState>()((set) => ({
  isOpen: false,
  title: "",
  content: "",
  confirmText: "Confirm",
  onConfirm: null,
  setOpen: (config) =>
    set({
      isOpen: true,
      title: config.title,
      content: config.content,
      confirmText: config.confirmText,
      onConfirm: config.onConfirm,
    }),
  resetForm: () =>
    set({
      isOpen: false,
      title: "",
      content: "",
      confirmText: "Confirm",
      onConfirm: null,
    }),
}));
