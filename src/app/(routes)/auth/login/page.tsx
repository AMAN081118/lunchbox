"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function LoginPage() {
  const router = useRouter();
  const setProfile = useUserStore((state) => state.setProfile);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1️⃣ Log in via Supabase
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !loginData.user) {
      setError(loginError?.message || "Login failed");
      setLoading(false);
      return;
    }

    const userId = loginData.user.id;

    // 2️⃣ Fetch user profile from profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profileData) {
      setError(profileError?.message || "Failed to fetch user profile");
      setLoading(false);
      return;
    }

    // 3️⃣ Store profile in Zustand
    setProfile(profileData);

    // 4️⃣ Redirect to home page
    router.push("/");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
