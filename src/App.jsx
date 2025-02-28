import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppProvider } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import {jwtDecode} from "jwt-decode"; // Import the decoder
import { HouseWifi, BellRing, Wifi, LogOut } from "lucide-react";
import { CssBaseline } from "@mui/material";

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

const token = localStorage.getItem("token");

let user = null;
if (token) {
  try {
    user = jwtDecode(token); // Decode JWT to get user details
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

const demoSession = {
  user: {
    name: user?.phone || "Unknown", // Use optional chaining to avoid errors
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

console.log(demoSession);

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(to right,#3361A7, #E0EBF1)",
          minHeight: "100vh",
        },
      },
    },
  },
});
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
      theme={theme}
    >
      <CssBaseline />
      <Outlet />
    </AppProvider>
  );
}

export default App;
