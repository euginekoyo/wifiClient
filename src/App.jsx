import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { HouseWifi, BellRing, Wifi, LogOut, Axis3D } from "lucide-react";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  {
    segment: "layout/dashboard",
    title: "Dashboard",
    icon: <HouseWifi />,
    path: "/layout/dashboard",
  },
  {
    segment: "layout/admin/dashboard",
    title: "Dashboard",
    icon: <Axis3D />,
    path: "/layout/admin/dashboard",
  },
  {
    segment: "layout/notification",
    title: "Notification",
    icon: <BellRing />,
    path: "/layout/notification",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogOut />,
    path: "/",
  },
];

function App() {
  return (
    <AppProvider
      navigation={NAVIGATION.map((item) =>
        item.path
          ? {
              ...item,
              render: () => (
                <NavLink
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item.icon} {item.title}
                </NavLink>
              ),
            }
          : item
      )}
      branding={{
        logo: <Wifi size={40} color="#960d0d" strokeWidth={2.75} />,
        title: "SmartWIFI",
      }}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
