import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-slate-50">
      <Flex direction="column" h="100vh">
        <Box
          display={{ base: "none", md: "flex" }}
          w={{ md: 56, lg: 64 }}
          h="100%"
          position="fixed"
          insetY={0}
          zIndex={40}
          className="shadow-sm"
        >
          <Sidebar />
        </Box>
        <Box
          h={16}
          w="100%"
          position="fixed"
          zIndex={50}
          pl={{ base: 0, md: 56, lg: 64 }}
        >
          <Navbar />
        </Box>

        <Box
          ml={{ base: 0, md: 56, lg: 64 }}
          overflowY="auto"
          className="flex-grow h-full mt-16"
          flexGrow={{ md: 1 }}
          pl={8}
        >
          {children}
        </Box>
      </Flex>
    </div>
  );
}
