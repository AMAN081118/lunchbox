import { create } from "zustand";

interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  hostel_id: string;
  preferred_canteen_id: string;
  gender: string;
  role: "student" | "owner";
}

interface UserStore {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
