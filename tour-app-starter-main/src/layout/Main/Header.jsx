import {
  Avatar,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import Logo from "../../components/Logo";
import Inputt from "./Inputt";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginRounded,
  PersonAddRounded,
  LogoutRounded,
} from "@mui/icons-material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleSignup = () => {
    navigate("/signup");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
    setUserName("");
    handleClose();
    navigate("/login");
  };

  const isLoggedIn = !!userName;

  return (
    <Stack spacing={2}>
      <Box sx={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 2 }}
        >
          <Logo />
          <Inputt />
          <IconButton
            onClick={handleClick}
            sx={{
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s",
              },
            }}
          >
            <Avatar alt={userName || "User"} src={faker.image.avatar()} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 4,
              sx: {
                width: "200px",
                mt: 1.5,
                overflow: "visible",
                borderRadius: "12px",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            {isLoggedIn ? (
              <>
                <Box sx={{ p: 2, pb: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight={600}
                  >
                    {userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back!
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <LogoutRounded
                    sx={{ mr: 2, fontSize: 20, color: "error.main" }}
                  />
                  <Typography variant="body2" color="error.main">
                    Logout
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <Box sx={{ p: 2, pb: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight={600}
                  >
                    Welcome
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign in to access your account
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={handleLogin}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <LoginRounded
                    sx={{ mr: 2, fontSize: 20, color: "primary.main" }}
                  />
                  <Typography variant="body2">Log in</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleSignup}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <PersonAddRounded
                    sx={{ mr: 2, fontSize: 20, color: "primary.main" }}
                  />
                  <Typography variant="body2">Sign up</Typography>
                </MenuItem>
              </>
            )}
          </Menu>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Header;
