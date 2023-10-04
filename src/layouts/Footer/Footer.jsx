import { AppBar, Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar component="footer" position="static" sx={{ justySelf: "flex-end" }}>
      <Box sx={{ paddingBlock: 2 }}>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="p" component="div" sx={{ fontSize: ".8rem" }}>
            &copy; Copyright 2023
          </Typography>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Footer;
