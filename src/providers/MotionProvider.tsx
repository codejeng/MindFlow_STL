"use client";

import { AnimatePresence } from "framer-motion";

interface MotionProviderProps {
  children: React.ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
