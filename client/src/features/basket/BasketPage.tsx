import agent from "@/app/api/agent";
import { useStoreContext } from "@/app/context/context";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import BasketSummary from "./BasketSummary";

export const BasketPage = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });
  function handleAddItem(productId: number) {
    setStatus({
      loading: true,
      name: "add" + productId,
    });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      );
  }
  function handleRemoveItem(
    productId: number,
    quantity: number = 1,
    isDelete = false
  ) {
    setStatus({
      loading: true,
      name: isDelete ? "delete" + productId : "remove" + productId,
    });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      );
  }

  if (!basket || basket.items.length === 0)
    return <Typography variant="h5"> Your basket is empty </Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading && status.name === "remove" + row.productId
                    }
                    onClick={() => handleRemoveItem(row.productId)}
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === "add" + row.productId
                    }
                    onClick={() => handleAddItem(row.productId)}
                    color="success"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((row.price * row.quantity) / 100).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading && status.name === "delete" + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(row.productId, row.quantity, true)
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={10} display="flex" justifyContent="flex-end">
        <Box width="50%">
          <BasketSummary items={basket.items} />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};
