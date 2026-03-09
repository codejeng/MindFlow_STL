"use client";

import ThemeProvider from "./ThemeProvider";
import MotionProvider from "./MotionProvider";
import { GameProvider } from "@/context/GameContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <GameProvider>
        <MotionProvider>{children}</MotionProvider>
      </GameProvider>
    </ThemeProvider>
  );
}
