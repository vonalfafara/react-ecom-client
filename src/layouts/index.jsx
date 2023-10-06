import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";
import { Box, Container } from "@mui/material";

const index = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Container>
          <Routes>
            {routes.map((route, index) => {
              if (route.children?.length) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                    exact
                  >
                    {route.children.map((childRoute, childIndex) => {
                      return (
                        <Route
                          key={childIndex}
                          path={childRoute.path}
                          element={childRoute.element}
                          exact
                        />
                      );
                    })}
                  </Route>
                );
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  exact
                />
              );
            })}
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default index;
