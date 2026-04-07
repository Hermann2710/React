import { LayoutDashboard, Package, Users, Settings, ShoppingCart } from "lucide-react";

export const navItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Commandes",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Produits",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Clients",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Paramètres",
    url: "/dashboard/settings",
    icon: Settings,
  },
];