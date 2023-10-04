import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { navRoutes, authRoutes, profileRoute } from "../../routes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../lib/http";

const Header = () => {
  const navigate = useNavigate();
  const [drawerState, setDrawerState] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    checkToken();
    window.addEventListener("authenticated", checkToken);
    return () => {
      window.removeEventListener("authenticated", () => {});
    };
  }, []);

  function checkToken() {
    setToken(localStorage.getItem("token"));
  }

  function handleCloseNavMenu(path) {
    navigate(path);
    setDrawerState(false);
  }

  function logout() {
    const api = http({
      Authorization: `Bearer ${token}`,
    });
    api.post("/logout");
    localStorage.clear();
    window.dispatchEvent(new Event("authenticated"));
    navigate("/");
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              justifyContent: { xs: "flex-end", md: "space-between" },
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navRoutes.map((route, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(route.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {route.name}
                </Button>
              ))}
            </Box>
            {token ? (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => handleCloseNavMenu(profileRoute.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {profileRoute.name}
                </Button>
                <Button
                  onClick={logout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {authRoutes.map((route, index) => (
                  <Button
                    key={index}
                    onClick={() => handleCloseNavMenu(route.path)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {route.name}
                  </Button>
                ))}
              </Box>
            )}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawerState(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={() => setDrawerState(!drawerState)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {navRoutes.map((route, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleCloseNavMenu(route.path)}
                  >
                    <ListItemText primary={route.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <List>
            {authRoutes.map((route, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleCloseNavMenu(route.path)}
                  >
                    <ListItemText primary={route.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
