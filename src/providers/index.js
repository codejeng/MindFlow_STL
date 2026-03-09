"use client";

import ThemeProvider from "./ThemeProvider";
import MotionProvider from "./MotionProvider";

export default function AppProviders({ children }) {
    return (
        <ThemeProvider>
            <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
    );
}
