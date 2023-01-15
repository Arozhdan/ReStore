import { useDebounce } from "@/app/hoocks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/app/store/configureStore";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { setProductParams } from "./catalogSlice";

export const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm?.trim() === productParams.searchTerm?.trim())
      return;
    dispatch(setProductParams({ searchTerm: debouncedSearchTerm }));
  }, [debouncedSearchTerm, dispatch, productParams.searchTerm]);

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
    />
  );
};
