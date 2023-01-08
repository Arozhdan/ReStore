import { IProduct } from "@models/product.interface";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";

export const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add product</Button>
    </>
  );
};
