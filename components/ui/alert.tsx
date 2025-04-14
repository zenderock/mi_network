import * as React from "react";

export interface AlertProps {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  className?: string;
}

export function Alert({ type = "info", message, className = "" }: AlertProps) {
  const baseStyle = "rounded-md px-4 py-2 mb-2 text-sm font-medium ";
  let colorStyle = "";
  switch (type) {
    case "success":
      colorStyle = "bg-green-100 text-green-800 border border-green-300";
      break;
    case "error":
      colorStyle = "bg-red-100 text-red-800 border border-red-300";
      break;
    case "warning":
      colorStyle = "bg-yellow-100 text-yellow-800 border border-yellow-300";
      break;
    default:
      colorStyle = "bg-blue-100 text-blue-800 border border-blue-300";
  }
  return (
    <div className={`${baseStyle} ${colorStyle} ${className}`}>{message}</div>
  );
}
