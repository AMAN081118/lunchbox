import { create } from "zustand";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  hostel_id: string;
  preferred_canteen_id: string;
  gender: string;
  role: string;
}

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
