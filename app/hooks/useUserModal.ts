import { create } from "zustand";

interface UseUserModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUserModal = create<UseUserModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));