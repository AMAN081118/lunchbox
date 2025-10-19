"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";
import { X, Mail, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/useUserStore";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const setProfile = useUserStore((state) => state.setProfile);
  const { closeLoginModal } = useModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleEmailLogin = useCallback(async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Supabase login
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

      // 2️⃣ Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", loginData.user.id)
        .single();

      if (profileError || !profileData) {
        setError(profileError?.message || "Failed to fetch profile");
        setLoading(false);
        return;
      }

      // 3️⃣ Store in Zustand
      setProfile(profileData);

      // 4️⃣ Close modal & redirect
      handleClose();
      closeLoginModal();
      router.push("/"); // redirect to home
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [email, password, router, setProfile, closeLoginModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 sm:p-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Email & Password */}
        <div className="flex flex-col space-y-3 mb-4">
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm uppercase">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Placeholder buttons */}
        <button
          className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition mb-4"
          onClick={() => alert("Phone login not implemented")}
        >
          Send One Time Password
        </button>

        <button
          className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition mb-6"
          onClick={() => alert("Google login not implemented")}
        >
          Continue with Google
        </button>

        {/* Link to Register */}
        <div className="text-center text-gray-600 text-sm">
          New to LunchBox?{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
