import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface IHeaderProps {
  isDark: boolean;
  handleChangeTheme: (mode: boolean) => void;
}

export const Header = ({
  handleChangeTheme: changeTheme,
  isDark,
}: IHeaderProps) => {
  return (
    <AppBar position="static" sx={{ mb: 6 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch
          checked={isDark}
          onChange={() => changeTheme(!isDark)}
          color="secondary"
        />
      </Toolbar>
    </AppBar>
  );
};
