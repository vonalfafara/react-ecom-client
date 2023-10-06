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
  FormHelperText,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useState } from "react";
import http from "../../lib/http";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const [openSnackbar, setOpenSnackbar] = useState(false);

  async function submit(e) {
    e.preventDefault();
    try {
      const body = {
        username,
        email,
        first_name,
        last_name,
        middle_name,
        password,
        password_confirmation,
      };
      const api = http();
      const user = await api.post("/register", body);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", JSON.stringify(user.data.user));
      window.dispatchEvent(new Event("authenticated"));
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
      setErrors(e.response.data.errors);
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
              <Typography sx={{ mb: "2rem" }}>Register</Typography>
              <FormControl
                error={!!errors?.username?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  value={username}
                  aria-describedby="username-error"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors?.username?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="username-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
              <FormControl
                error={!!errors?.email?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  value={email}
                  aria-describedby="email-error"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors?.email?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="email-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
              <FormControl
                error={!!errors?.first_name?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  value={first_name}
                  aria-describedby="firstname-error"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors?.first_name?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="firstname-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
              <FormControl
                error={!!errors?.last_name?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  value={last_name}
                  aria-describedby="lastname-error"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors?.last_name?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="lastname-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
              <FormControl sx={{ width: "100%", mb: "1rem" }}>
                <InputLabel htmlFor="middleName">Middle Name</InputLabel>
                <Input
                  id="middleName"
                  value={middle_name}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </FormControl>
              <FormControl
                error={!!errors?.password?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  aria-describedby="password-error"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors?.password?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="password-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
              <FormControl
                error={!!errors?.password_confirmation?.length}
                sx={{ width: "100%", mb: "1rem" }}
              >
                <InputLabel htmlFor="passwordConfirmation">
                  Confirm Password
                </InputLabel>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  value={password_confirmation}
                  aria-describedby="passwordconfirmation-error"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {errors?.password_confirmation?.map((error, index) => {
                  return (
                    <FormHelperText key={index} id="passwordconfirmation-error">
                      {error}
                    </FormHelperText>
                  );
                })}
              </FormControl>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit">
                Register
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

export default Registration;
