import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * ARCHITECTURAL DECISION: Zustand with Persistence
 * We use Zustand over Redux/Context for its minimal boilerplate and superior performance with 
 * selective re-rendering. The 'persist' middleware is critical for B2B SaaS to ensure the 
 * user's visual preference (Dark Mode) is maintained across page refreshes and different 
 * browser sessions without requiring a database call.
 */

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    { name: "theme-storage" }
  )
);
