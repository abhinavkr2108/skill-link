"use client";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import React, { Fragment } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import { routes } from "./SidebarRoutes";
import SidebarItem from "./SidebarItem";

export default function NavigationDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <IconButton
        icon={<Menu />}
        variant="ghost"
        aria-label="menu"
        onClick={onOpen}
      />

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            {" "}
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <Box className="flex flex-col w-full" onClick={onClose}>
              {routes.map((route, idx: number) => (
                <SidebarItem
                  key={idx}
                  icon={route.icon}
                  name={route.name}
                  path={route.path}
                />
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
