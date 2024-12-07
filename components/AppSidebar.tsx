import {
  BookMarked,
  ChartLine,
  ChevronRight,
  FlaskConical,
  Home,
  Hop,
  ReceiptText,
  Settings,
  ShoppingBasket,
  Store,
  Thermometer,
  WalletCards,
  Waves,
  Wheat,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import AdminNav from "@/app/admin/_components/AdminNav/AdminNav";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: ReceiptText,
  },
  {
    title: "Ingredients",
    url: "/ingredients",
    icon: Store,
    items: [
      { title: "Hops", url: "/ingredients/hops", icon: Hop },
      { title: "Fermentables", url: "/ingredients/fermentables", icon: Wheat },
      { title: "Yeasts", url: "/ingredients/yeasts", icon: FlaskConical },
      { title: "Other", url: "/ingredients/other", icon: ShoppingBasket },
    ],
  },
  {
    title: "Profiles",
    url: "/profiles",
    icon: WalletCards,
    items: [
      {
        title: "Fermentation",
        url: "/profiles/fermentation",
        icon: ChartLine,
      },
      { title: "Water", url: "/profiles/water", icon: Waves },
      { title: "Mash", url: "/profiles/mash", icon: Thermometer },
    ],
  },
  { title: "Styles", url: "/styles", icon: BookMarked },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ChartLine className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  LNK Brewing
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) =>
            item.items?.length ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <CollapsibleTrigger asChild>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarMenuAction>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuButton key={item.title} tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            ),
          )}
          <SidebarSeparator />

          <AdminNav />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
