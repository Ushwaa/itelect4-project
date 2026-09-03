import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  isDarkMode: boolean;
  searchTerm: string;
  enrolledCourseCodes: string[];
  toggleDarkMode: () => void;
  setSearchTerm: (term: string) => void;
  enrollInCourse: (code: string) => void;
}

const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      searchTerm: "",
      enrolledCourseCodes: [],
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      enrollInCourse: (code) =>
        set((state) =>
          state.enrolledCourseCodes.includes(code)
            ? state
            : { enrolledCourseCodes: [...state.enrolledCourseCodes, code] }
        ),
    }),
    {
      name: "itelect4-ui",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        enrolledCourseCodes: state.enrolledCourseCodes,
      }),
    }
  )
);

export default useUiStore;