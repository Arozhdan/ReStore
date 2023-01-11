import agent from "@/app/api/agent";
import { Alert, AlertTitle, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const AboutPage = () => {
  const [validationError, setValidationError] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.get400ValidationError().catch((err) =>
      setValidationError(err)
    );
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400().catch((err) => console.log(err))
          }
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401().catch((err) => console.log(err))
          }
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404().catch((err) => console.log(err))
          }
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500().catch((err) => console.log(err))
          }
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
      {validationError.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors:</AlertTitle>
          <List>
            {validationError.map((err, i) => (
              <ListItem key={i + err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};
