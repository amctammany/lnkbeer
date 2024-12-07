"use client";
import Link, { LinkProps } from "next/link";
import { useSidebar } from "./ui/sidebar";

export type NavLinkProps = LinkProps & {
  href: string;
  children?: React.ReactNode;
};
export const NavLink = ({ href, children, ...props }: NavLinkProps) => {
  const { isMobile, openMobile, toggleSidebar } = useSidebar();
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (isMobile && openMobile) toggleSidebar();
  };
  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
