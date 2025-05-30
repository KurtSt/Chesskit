import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import NextLink from "next/link";
import Button from "@mui/material/Button";

interface Props {
  darkMode: boolean;
  switchDarkMode: () => void;
}

// Styled component to make the link look like a button
const StyledIconButtonLink = styled("a")({
  color: "inherit",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none", // Remove underline from link
  "&:hover": {
    cursor: "pointer", // Change cursor on hover
  },
});

export default function NavBar({ darkMode, switchDarkMode }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth(); // Get user and logout from useAuth

  useEffect(() => {
    setDrawerOpen(false);
  }, [router.pathname]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: darkMode ? "#19191c" : "white",
          color: darkMode ? "white" : "black",
        }}
        enableColorOnDark
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: "min(0.5vw, 0.6rem)" }}
            onClick={() => setDrawerOpen((val) => !val)}
          >
            <Icon icon="mdi:menu" />
          </IconButton>

          <Image
            src="/favicon-32x32.png"
            alt="Chesskit logo"
            width={32}
            height={32}
          />

          <NavLink href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Image
              src="/favicon-32x32.png"
              alt="Chesskit logo"
              width={32}
              height={32}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                ml: 1,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              Chesskit
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1 }} /> {/* This Box will push subsequent items to the right */}

          {/* Auth Buttons */}
          {user ? (
            <>
              <Typography sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>{user.email}</Typography>
              <Button color="inherit" onClick={logout} sx={{textTransform: "none"}}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={NextLink} href="/login" sx={{textTransform: "none"}}>
                Login
              </Button>
              <Button color="inherit" component={NextLink} href="/register" sx={{textTransform: "none"}}>
                Register
              </Button>
            </>
          )}

          <StyledIconButtonLink
            href="https://discord.gg/Yr99abAcUr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton color="inherit" component="span">
              <Icon icon="ri:discord-fill" />
            </IconButton>
          </StyledIconButtonLink>

          <StyledIconButtonLink
            href="https://github.com/GuillaumeSD/Chesskit"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ml: "min(0.6rem, 0.8vw)" }}
          >
            <IconButton color="inherit" component="span">
              <Icon icon="mdi:github" />
            </IconButton>
          </StyledIconButtonLink>

          <IconButton
            sx={{ ml: "min(0.6rem, 0.8vw)" }}
            onClick={switchDarkMode}
            color="inherit"
            edge="end"
          >
            {darkMode ? (
              <Icon icon="mdi:brightness-7" />
            ) : (
              <Icon icon="mdi:brightness-4" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
}
