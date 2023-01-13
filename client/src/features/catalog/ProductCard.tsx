import agent from "@/app/api/agent";
import { useStoreContext } from "@/app/context/context";
import { LoadingComponent } from "@/app/layout/LoadingComponent";
import { formatCurrency } from "@/app/util/util";
import { IProduct } from "@models/product.interface";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";

interface IProductCardProps {
  product: IProduct;
}
export const ProductCard = ({ product }: IProductCardProps) => {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const handleAddItem = async (productId: number) => {
    setLoading(true);
    try {
      const basket = await agent.Basket.addItem(productId);
      setBasket(basket);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          size="small"
          onClick={() => handleAddItem(product.id)}
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={"/catalog/" + product.id} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};
