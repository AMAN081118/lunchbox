"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const profile = useUserStore((state) => state.profile);

  useEffect(() => {
    if (!profile) router.push("/auth/login");
  }, [profile, router]);

  if (!profile) return null; // could show spinner

  return <>{children}</>;
};

export default ProtectedRoute;
