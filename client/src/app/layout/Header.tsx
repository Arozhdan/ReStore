import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Box, List, Switch, Toolbar, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface IHeaderProps {
  isDark: boolean;
  handleChangeTheme: (mode: boolean) => void;
}

const navLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contacts" },
];

const rightNavLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  textDecoration: "none",
  color: "inherit",
  transition: "all 0.3s ease",
  "&.active": { color: "text.secondary" },
  "&:hover": { color: "secondary.main" },
};
export const Header = ({
  handleChangeTheme: changeTheme,
  isDark,
}: IHeaderProps) => {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <AppBar position="static" sx={{ mb: 6 }}>
      <Toolbar
        sx={{
          display: "felx",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch
            checked={isDark}
            onChange={() => changeTheme(!isDark)}
            color="secondary"
          />
        </Box>
        <Box display="flex" alignItems="center">
          <List sx={{ display: "flex" }}>
            {navLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightNavLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
