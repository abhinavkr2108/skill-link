"use client";
import { Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";
import { useUser } from "@clerk/nextjs";

export const routes = [
  {
    icon: Layout,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    name: "Browse",
    path: "/search",
  },
  {
    icon: List,
    name: "Your Courses",
    path: "/courses",
  },
];
export default function SidebarRoutes() {
  const { user, isLoaded } = useUser();
  return (
    <div className="flex flex-col w-full h-full">
      {routes.map((route, idx: number) => (
        <SidebarItem
          key={idx}
          icon={route.icon}
          name={route.name}
          path={route.path}
        />
      ))}
    </div>
  );
}
