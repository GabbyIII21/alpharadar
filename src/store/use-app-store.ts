"use client";

import { create } from "zustand";

type AppState = {
  sidebarOpen: boolean;
  selectedConversationId: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedConversationId: (id: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  selectedConversationId: "conv-001",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),
}));
