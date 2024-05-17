import { Form } from "."

import { IonImg } from "@ionic/react";

export const FormLogin = {
  Root: ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
    </div>
  ),
  Actions: ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-between mt-4">{children}</div>
  ),
  ActionButton: ({ text }: { text: string }) => (
    <button
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      type="submit"
    >
      {text}
    </button>
  ),
};
