import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = "Viewer" | "Admin";

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Admin"); // Defaults to Admin
  
  const isAdmin = role === "Admin";

  return (
    <UserContext.Provider value={{ role, setRole, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};