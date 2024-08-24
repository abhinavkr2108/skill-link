import { Box } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

export default function Sidebar() {
  return (
    <Box className="border-r w-full h-full">
      <Box p={5}>
        <Logo />
      </Box>
      <Box className="flex flex-col w-full">
        <SidebarRoutes />
      </Box>
    </Box>
  );
}
