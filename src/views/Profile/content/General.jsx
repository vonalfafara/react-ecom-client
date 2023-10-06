import { useState } from "react";
import { Typography } from "@mui/material";

const General = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <Typography variant="p" component="p" sx={{ mb: 2 }}>
        Name: {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="p" component="p" sx={{ mb: 2 }}>
        Username: {user.username}
      </Typography>
      <Typography variant="p" component="p" sx={{ mb: 2 }}>
        Email: {user.email}
      </Typography>
    </>
  );
};

export default General;
