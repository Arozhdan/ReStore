import { useAppSelector } from "@/app/store/configureStore";
import { IProduct } from "@models/product.interface";
import { Grid, Typography } from "@mui/material";
import { ProductCard } from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface IProductListProps {
  products: IProduct[];
}
export const ProductList = ({ products }: IProductListProps) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  if (!products.length)
    return <Typography variant="h5">Nothing was found</Typography>;
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          {productsLoaded ? (
            <ProductCard product={product} />
          ) : (
            <ProductCardSkeleton />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
