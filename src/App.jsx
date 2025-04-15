import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AppProvider } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode"; // Import the decoder
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
];

const token = localStorage.getItem("token");
const logged = JSON.stringify(localStorage.getItem("user"));
console.log(logged);
let user = null;
if (token && logged) {
  try {
    // tok=jwtDecode(token)
    user = logged;
  } catch (error) {
    console.error("Invalid token:", error);
  }
}

const demoSession = {
  user: {
    name: user || "User", // Use optional chaining to avoid errors
    email: "",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

// console.log(demoSession);

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
      signOut: async () => {
        const token = localStorage.getItem("token");
        const User = localStorage.getItem("user");

        try {
          if (token || User) {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
          }
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          // Ensure token is cleared and user is redirected
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setSession(null);
          window.location.href = "/"; // Redirect to login page
        }
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
      <Outlet context={{ authentication }} />{" "}
      {/* Pass authentication via context */}
    </AppProvider>
  );
}

export default App;
