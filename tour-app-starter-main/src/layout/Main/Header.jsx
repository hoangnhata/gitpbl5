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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginRounded,
  PersonAddRounded,
  LogoutRounded,
} from "@mui/icons-material";
// Make sure this path is correct relative to Header.jsx
import axiosInstance from "../../api/axiosConfig";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        const userResponse = await axiosInstance.get("/api/users/myInformation");

        if (userResponse.data.code === 0 || userResponse.data.code === 200) {
          const userData = userResponse.data.result;
          setUserInfo(userData);
          setUserName(userData.username);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();

    const handleStorageChange = () => {
      fetchUserInfo();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
    setUserInfo(null);
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
          <IconButton onClick={handleClick}>
            <Avatar
              alt={userName || "User"}
              src={userInfo?.thumbnailUrl || "/default-avatar.png"}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                  <Avatar
                    src={userInfo?.thumbnailUrl || "/default-avatar.png"}
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 1rem",
                      border: "2px solid #eee",
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {userInfo?.fullname || userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userInfo?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userInfo?.phone}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutRounded sx={{ mr: 2, color: "error.main" }} />
                  <Typography color="error.main">Logout</Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <Box sx={{ p: 2, pb: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Welcome
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sign in to access your account
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogin}>
                  <LoginRounded sx={{ mr: 2 }} />
                  <Typography>Log in</Typography>
                </MenuItem>
                <MenuItem onClick={handleSignup}>
                  <PersonAddRounded sx={{ mr: 2 }} />
                  <Typography>Sign up</Typography>
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
