// src/context/ModalContext.tsx (New File)

"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context data
interface ModalContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

// Create the Context object
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Define the Provider component
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const value = {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

// Custom hook for consuming the context easily
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
