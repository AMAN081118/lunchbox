"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Hostel {
  id: string;
  name: string;
  is_girls: boolean;
}

interface Canteen {
  id: string;
  name: string;
  based_hostel_id: string;
  hostels_allowed: string[];
  is_girls: boolean;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [hostelId, setHostelId] = useState("");
  const [preferredCanteenId, setPreferredCanteenId] = useState("");
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load all hostels
  useEffect(() => {
    const fetchHostels = async () => {
      const { data, error } = await supabase
        .from("hostels")
        .select("id, name, is_girls")
        .order("name");

      if (error) console.error("Error fetching hostels:", error.message);
      else setHostels(data || []);
    };

    fetchHostels();
  }, []);

  // 🔹 Load available canteens dynamically via RPC
  useEffect(() => {
    const fetchCanteens = async () => {
      if (!hostelId || !gender) {
        setCanteens([]);
        return;
      }

      const { data, error } = await supabase.rpc("get_available_canteens", {
        p_hostel_id: hostelId,
        p_gender: gender,
      });

      if (error) {
        console.error("Error fetching canteens:", error.message);
        setCanteens([]);
      } else {
        setCanteens(data || []);
      }
    };

    fetchCanteens();
  }, [hostelId, gender]);

  // 🔹 Register user
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // College email restriction
    if (!email.endsWith("@iiitdmj.ac.in")) {
      setError("Use your official college email only.");
      setLoading(false);
      return;
    }

    if (!preferredCanteenId) {
      setError("Please select your preferred canteen.");
      setLoading(false);
      return;
    }

    const selectedHostel = hostels.find((h) => h.id === hostelId);
    if (selectedHostel && selectedHostel.is_girls && gender === "male") {
      setError("Male students cannot select a girls' hostel.");
      setLoading(false);
      return;
    }

    // Step 1: Supabase Auth signup with metadata
    const { data: signupData, error: signupError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            hostel_id: hostelId,
            preferred_canteen_id: preferredCanteenId,
            gender,
            role: "student",
          },
        },
      },
    );

    if (signupError || !signupData.user) {
      setError(signupError?.message || "Signup failed.");
      setLoading(false);
      return;
    }

    const userId = signupData.user.id;

    // Step 2: Insert profile row
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      phone,
      email,
      hostel_id: hostelId,
      preferred_canteen_id: preferredCanteenId,
      gender,
      role: "student",
    });

    if (profileError) {
      setError("Database error saving profile: " + profileError.message);
    } else {
      alert(
        "Registration successful! Check your email for confirmation link. " +
          "It may take a few minutes to arrive.",
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
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
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          />
          <input
            type="tel"
            placeholder="+919876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Hostel dropdown */}
          <select
            value={hostelId}
            onChange={(e) => setHostelId(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
          >
            <option value="">Select Hostel</option>
            {hostels
              .filter((h) => {
                if (!gender) return true;
                if (gender === "female") return true; // female can see all hostels
                if (gender === "male" && h.is_girls) return false; // hide girls hostel for male
                return true;
              })
              .map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
          </select>

          {/* Preferred Canteen dropdown */}
          <select
            value={preferredCanteenId}
            onChange={(e) => setPreferredCanteenId(e.target.value)}
            className="border rounded-lg p-2 w-full"
            required
            disabled={!canteens.length}
          >
            <option value="">
              {canteens.length
                ? "Select Preferred Canteen"
                : "No canteens available"}
            </option>
            {canteens.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
