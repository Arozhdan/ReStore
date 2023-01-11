import agent from "@/app/api/agent";
import { LoadingComponent } from "@/app/layout/LoadingComponent";
import { IProduct } from "@models/product.interface";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";

export const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add product</Button>
    </>
  );
};
