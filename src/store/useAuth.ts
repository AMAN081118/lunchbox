import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
}));

supabase.auth.onAuthStateChange((_event, session) => {
  useAuth.setState({ user: session?.user ?? null, loading: false });
});
