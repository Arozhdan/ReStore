import { LoadingComponent } from "@/app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "@/app/store/configureStore";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import { ProductList } from "./ProductList";

export const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add product</Button>
    </>
  );
};
