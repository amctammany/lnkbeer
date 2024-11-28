import {
  ChartColumn,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
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
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>Sidebar</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={true}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton>
                          <>
                            {subItem.icon && <subItem.icon />}
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
