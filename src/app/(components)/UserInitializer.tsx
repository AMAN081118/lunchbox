// src/app/(components)/UserInitializer.tsx
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";

export default function UserInitializer() {
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    const initUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) setProfile(profile);
      }
    };

    initUser();
  }, [setProfile]);

  return null;
}
