import agent from "@/app/api/agent";
import { NotFound } from "@/app/errors";
import { LoadingComponent } from "@/app/layout/LoadingComponent";
import { IProduct } from "@/app/models/product.interface";
import { useAppDispatch, useAppSelector } from "@/app/store/configureStore";
import { formatCurrency } from "@/app/util/util";
import { LoadingButton } from "@mui/lab";
import { Grid, Table, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id || "-1"))
  );
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((x) => x.productId === product?.id);

  useEffect(() => {
    if (!id) return;
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [dispatch, id, item, product]);

  function handleInputChange(event: any) {
    if (event.target.value < 0) return;
    setQuantity(parseInt(event.target.value));
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (loading.includes("pending"))
    return <LoadingComponent message="Loading details..." />;
  if (!product) return <NotFound />;
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h4">{formatCurrency(product.price)}</Typography>
          <Divider sx={{ my: 2 }} />
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity in stock</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                type="number"
                label="Quantity in Cart"
                fullWidth
                value={quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                sx={{
                  height: "55px",
                }}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                loading={
                  status.includes("pendingRemoveItem" + product?.id) ||
                  status.includes("pendingAddItem" + product?.id)
                }
                disabled={
                  item?.quantity === quantity || (!item && quantity === 0)
                }
                onClick={handleUpdateCart}
              >
                {item ? "Update Cart" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
