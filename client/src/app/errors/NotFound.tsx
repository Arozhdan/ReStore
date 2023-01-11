import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container component={Paper}>
      <Typography variant="h5" pt={3} gutterBottom>
        Oops - We couldn't find that page
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button fullWidth component={Link} to="/catalog">
        Go back to the shop
      </Button>
    </Container>
  );
};
