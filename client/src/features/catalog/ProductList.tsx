import { IProduct } from "@models/product.interface";
import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";

interface IProductListProps {
  products: IProduct[];
}
export const ProductList = ({ products }: IProductListProps) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} md={4} xl={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
