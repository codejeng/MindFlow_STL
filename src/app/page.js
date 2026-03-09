"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography variant="h2" fontWeight={700}>
          MindFlow
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your intelligent productivity companion
        </Typography>
        <Button variant="contained" size="large">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
