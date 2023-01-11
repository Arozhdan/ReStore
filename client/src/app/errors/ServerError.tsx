import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
export const ServerError = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h5" pt={3} color="error" gutterBottom>
            {state.error.title}
          </Typography>
          <Divider sx={{ my: 2 }}></Divider>
          <Typography variant="body1" gutterBottom>
            {state.error.detail} || 'Internal server error'
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Sever errror
        </Typography>
      )}
      <Button variant="text" onClick={() => navigate("/catalog")}>
        Go Back to the store
      </Button>
    </Container>
  );
};
