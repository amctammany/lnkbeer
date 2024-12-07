"use client";
import Link, { LinkProps } from "next/link";
import { useSidebar } from "./ui/sidebar";
import { useRouter } from "next/navigation";

export type NavLinkProps = LinkProps & {
  href: string;
  children?: React.ReactNode;
};
export const NavLink = ({ href, children, ...props }: NavLinkProps) => {
  const { isMobile, openMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const { replace } = useRouter();
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    //if (isMobile && openMobile) setOpenMobile(false);
    toggleSidebar();

    replace(e.currentTarget.href);
    e.preventDefault();
    return false;
  };
  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
