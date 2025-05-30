import NavLink from "@/components/NavLink";
import { Icon } from "@iconify/react";
import {
  Box,
  Drawer,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider, // Added Divider
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Added useAuth
import NextLink from "next/link"; // Added NextLink
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material"; // Added Icons

const MenuOptions = [
  { text: "Play", icon: "streamline:chess-pawn", href: "/play" },
  { text: "Analysis", icon: "streamline:magnifying-glass-solid", href: "/" },
  {
    text: "Database",
    icon: "streamline:database",
    href: "/database",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NavMenu({ open, onClose }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar />
      <Box sx={{ width: 250, overflow: "hidden" }}>
        <List>
          <Divider />
          {user ? (
            <ListItem disablePadding sx={{ margin: 0.7 }}>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon style={{ paddingLeft: "0.5em" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding sx={{ margin: 0.7 }}>
                <ListItemButton component={NextLink} href="/login" onClick={onClose}>
                  <ListItemIcon style={{ paddingLeft: "0.5em" }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ margin: 0.7 }}>
                <ListItemButton component={NextLink} href="/register" onClick={onClose}>
                  <ListItemIcon style={{ paddingLeft: "0.5em" }}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <Divider />
          {MenuOptions.map(({ text, icon, href }) => (
            <ListItem key={text} disablePadding sx={{ margin: 0.7 }}>
              <NavLink href={href}>
                <ListItemButton onClick={onClose}>
                  <ListItemIcon style={{ paddingLeft: "0.5em" }}>
                    <Icon icon={icon} height="1.5em" />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
