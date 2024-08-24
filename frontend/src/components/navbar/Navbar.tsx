"use client";
import { Box, Flex, IconButton, Spacer, Spinner, Text } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import NavigationDrawer from "../sidebar/NavigationDrawer";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [userName, setUserName] = useState<string>("");
  const user = useUser();

  useEffect(() => {
    if (user.isLoaded) {
      setUserName(user.user?.firstName || "");
    }
  }, [user.isLoaded]);

  return (
    <Box className="border-b shadow-sm z-50 flex items-center justify-between h-14 px-5">
      <Box className="flex gap-2 items-center">
        <Box display={{ base: "block", md: "none" }}>
          <NavigationDrawer />
        </Box>
        <Box fontWeight={600}>Welcome, {userName ? userName : <Spinner />}</Box>
      </Box>

      <UserButton />
    </Box>
  );
}
