import { Box, Container, Grid, Card, CardContent, Button } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { profileRoute } from "../../routes";

const Profile = () => {
  const navigate = useNavigate();
  function handleProfileNavigation(path) {
    navigate(path);
  }
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              {profileRoute.children.map((route, index) => {
                return (
                  <Button
                    key={index}
                    variant="text"
                    onClick={() => handleProfileNavigation(route.path)}
                  >
                    {route.name}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Card>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
