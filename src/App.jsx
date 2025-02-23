import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  HouseWifi,
  BellRing,
  Wifi,
  LogOut,
  ShieldEllipsis,
} from "lucide-react";
import PropTypes from "prop-types";
import {
  Stack,
  Divider,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";

const NAVIGATION = [
  { kind: "header" },
  {
    segment: "layout/dashboard",
    title: "Dashboard",
    icon: <HouseWifi />,
    path: "/layout/dashboard",
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




const demoSession = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

function App() {
  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);
  return (
    <AppProvider
      navigation={NAVIGATION.map((item) =>
        item.path
          ? {
              ...item,
              render: () => (
                <NavLink
                  to={item.path}
                  style={{ textDecoration: "none", color: "#BEB5A9" }}
                >
                  {item.icon} {item.title}
                </NavLink>
              ),
            }
          : item
      )}
      branding={{
        logo: <Wifi size={40} color="#6E473B" strokeWidth={2.75} />,
        title: "SmartWIFI",
      }}
      authentication={authentication}
      session={session}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
