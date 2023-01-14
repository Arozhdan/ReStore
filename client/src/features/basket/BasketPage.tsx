import { useAppDispatch, useAppSelector } from "@/app/store/configureStore";
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
import { Link } from "react-router-dom";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export const BasketPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
                    <Link
                      to={`/catalog/${row.productId}`}
                      style={{ color: "inherit" }}
                    >
                      {row.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(row.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + row.productId}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + row.productId}
                    onClick={() =>
                      dispatch(addBasketItemAsync({ productId: row.productId }))
                    }
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
                    loading={status === "pendingDeleteItem" + row.productId}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: row.quantity,
                          isDelete: true,
                        })
                      )
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
