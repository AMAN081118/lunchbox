// src/app/(components)/GlobalModalRenderer.tsx

"use client";
import React from "react";
import { useModal } from "@/context/ModalContext";
import LoginModal from "./ui/login-page/LoginModal";

const GlobalModalRenderer: React.FC = () => {
  // Use the custom hook to access the global modal state and actions
  const { isLoginModalOpen, closeLoginModal } = useModal();

  return (
    <LoginModal
      // Pass the state and action as required props to the modal
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
    />
  );
};

export default GlobalModalRenderer;
