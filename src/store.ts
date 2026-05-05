import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  userId: string;
  user: { name: string; email: string } | null;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7),
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      compareIds: [],
      addToCompare: (id) => {
        const { compareIds } = get();
        if (compareIds.length < 3 && !compareIds.includes(id)) {
          set({ compareIds: [...compareIds, id] });
        }
      },
      removeFromCompare: (id) => {
        set((state) => ({ compareIds: state.compareIds.filter((cid) => cid !== id) }));
      },
      clearCompare: () => {
        set({ compareIds: [] });
      },
    }),
    {
      name: 'lumina-storage',
    }
  )
);
