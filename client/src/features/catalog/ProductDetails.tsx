import { IProduct } from "@/app/models/product.interface";
import { Grid, Table } from "@mui/material";
import Divider from "@mui/material/Divider";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
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
          <Typography variant="h4">
            ${(product.price / 100).toFixed(2)}
          </Typography>
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
        </Grid>
      </Grid>
    </>
  );
};
