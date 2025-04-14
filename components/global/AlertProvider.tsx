"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Alert } from "@/components/ui/alert";
import { setAlertFunction } from "@/lib/alert-client";

interface AlertContextType {
  setAlert: (
    message: string,
    type?: "success" | "error" | "info" | "warning"
  ) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within an AlertProvider");
  return ctx;
}

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlertState] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  const setAlert = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlertState({ message, type });
    setTimeout(() => setAlertState(null), 5000);
  };

  const clearAlert = () => setAlertState(null);

  useEffect(() => {
    setAlertFunction(setAlert);
  }, []);

  return (
    <AlertContext.Provider value={{ setAlert, clearAlert }}>
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
}
