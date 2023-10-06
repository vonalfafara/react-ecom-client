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
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { navRoutes, authRoutes, profileRoute } from "../../routes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../lib/http";

const Header = () => {
  const navigate = useNavigate();
  const [drawerState, setDrawerState] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [token, setToken] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [paymentOption, setPaymentOption] = useState(null);

  useEffect(() => {
    checkToken();
    window.addEventListener("authenticated", checkToken);
    return () => {
      window.removeEventListener("authenticated", () => {});
    };
  }, []);

  async function getCartItems() {
    const api = http({
      Authorization: `Bearer ${token}`,
    });
    const response = await api.get("/cart");
    setCartItems(response.data?.data);
  }

  async function placeOrder() {
    const api = http({
      Authorization: `Bearer ${token}`,
    });

    try {
      const body = {
        payment_type: paymentOption,
      };
      api.post("/order", body);
      getCartItems();
    } catch (e) {
      console.log(e);
    }
  }

  function handleCartState() {
    setCartState(true);
    getCartItems();
  }

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
    setDrawerState(false);
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
                <IconButton
                  aria-label="open drawer"
                  sx={{ my: 2 }}
                  onClick={handleCartState}
                >
                  <LocalGroceryStoreIcon />
                </IconButton>
                <Button
                  onClick={() =>
                    handleCloseNavMenu(`${profileRoute.path}/general`)
                  }
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
            {token ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() =>
                      handleCloseNavMenu(`${profileRoute.path}/general`)
                    }
                  >
                    <ListItemText primary={profileRoute.name} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleCartState}>
                    <ListItemText primary="Cart" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={logout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              authRoutes.map((route, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleCloseNavMenu(route.path)}
                    >
                      <ListItemText primary={route.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })
            )}
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={cartState}
        onClose={() => setCartState(!cartState)}
      >
        <Box sx={{ width: 500, mt: 4 }}>
          <Container>
            <Typography variant="h5" component="h5" sx={{ mb: 4 }}>
              Cart
            </Typography>
            {cartItems.length ? (
              <>
                <Table sx={{ mb: 4 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            {item.total_price}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <FormControl sx={{ mb: 4 }}>
                  <FormLabel id="payment">Payment Options</FormLabel>
                  <RadioGroup
                    aria-labelledby="payment"
                    name="payment"
                    sx={{
                      flexDirection: "row",
                    }}
                    onChange={(e) => setPaymentOption(e.currentTarget.value)}
                  >
                    <FormControlLabel
                      value={"Debit/Credit Card"}
                      control={<Radio />}
                      label="Debit/Credit Card"
                    />
                    <FormControlLabel
                      value={"Cash on Delivery"}
                      control={<Radio />}
                      label="Cash on Delivery"
                    />
                  </RadioGroup>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained" onClick={placeOrder}>
                    Place Order
                  </Button>
                </Box>
              </>
            ) : null}
          </Container>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
