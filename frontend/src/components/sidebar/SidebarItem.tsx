import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  name: string;
  path: string;
}
export default function SidebarItem({
  icon: Icon,
  name,
  path,
}: SidebarItemProps) {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    pathName === path ||
    (pathName === "/" && path === "/") ||
    pathName?.startsWith(`${path}/`);

  const onClick = () => {
    router.push(path);
  };
  return (
    <button
      className={`flex items-center gap-x-2 text-slate-500 font-medium pl-5 transition-all hover:text-slate-600 hover:bg-slate-300/20 ${
        isActive
          ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
          : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={20}
          className={`text-slate-500 ${isActive && "text-sky-700"}`}
        />
        <span>{name}</span>
      </div>
    </button>
  );
}
