import {
  Box,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useState } from "react";
import http from "../../lib/http";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      const body = {
        username,
        password,
      };
      const api = http();
      const user = await api.post("/login", body);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data.user));
      window.dispatchEvent(new Event("authenticated"));
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
      setOpenSnackbar(true);
    }
  }

  function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Card sx={{ mx: "auto", maxWidth: 400, width: "100%" }}>
          <form onSubmit={submit}>
            <CardContent>
              <Typography sx={{ mb: "2rem" }}>Login</Typography>
              <FormControl sx={{ width: "100%", mb: "1rem" }}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "100%", mb: "1rem" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </CardActions>
          </form>
          <Snackbar
            open={openSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
