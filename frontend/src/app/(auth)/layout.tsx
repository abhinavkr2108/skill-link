import { Box } from "@chakra-ui/react";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="h-screen w-screen flex justify-center items-center">
      {children}
    </Box>
  );
}
