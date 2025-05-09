import {
  Avatar,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Logo from "../../components/Logo";
import Inputt from "./Inputt";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LoginRounded,
  PersonAddRounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// Make sure this path is correct relative to Header.jsx
import axiosInstance from "../../api/axiosConfig";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHostPage = location.pathname.startsWith("/host");
  const isProfilePage = location.pathname.startsWith("/profile");
  const isReservationPage = location.pathname.startsWith("/reservation");
  const isPropertyPage = location.pathname.startsWith("/property");
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");
  const isHost = userInfo?.roles?.includes("HOST");
  const isAdmin = userInfo?.roles?.includes("ADMIN");
  const isUser = userInfo?.roles?.includes("USER");

  // Get available roles based on user's highest role
  const getAvailableRoles = () => {
    if (isAdmin) {
      return ["ADMIN", "HOST", "USER"];
    } else if (isHost) {
      return ["HOST", "USER"];
    } else if (isUser) {
      return ["USER"];
    }
    return [];
  };

  const fetchUserInfo = async () => {
    try {
      const access_token = localStorage.getItem("accessToken");
      if (access_token) {
        const userResponse = await axiosInstance.get(
          "/api/users/myInformation"
        );

        if (userResponse.data.code === 0 || userResponse.data.code === 200) {
          const userData = userResponse.data.result;
          setUserInfo(userData);
          setUserName(userData.username);
          localStorage.setItem("user", JSON.stringify(userData));

          // Set initial selected role based on current path
          if (isAdminPage) {
            setSelectedRole("ADMIN");
          } else if (isHostPage) {
            setSelectedRole("HOST");
          } else if (isProfilePage) {
            setSelectedRole("USER");
          }
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
    window.addEventListener("userProfileUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userProfileUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isAdminPage) {
      setSelectedRole("ADMIN");
    } else if (isHostPage) {
      setSelectedRole("HOST");
    } else if (isProfilePage) {
      setSelectedRole("USER");
    } else {
      setSelectedRole(null);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

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
    setSelectedRole(null);
    handleClose();
    navigate("/login");
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    switch (role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "HOST":
        navigate("/host");
        break;
      case "USER":
        navigate("/profile");
        break;
      default:
        break;
    }
    handleClose();
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
          {isHomePage ? (
            <Inputt />
          ) : isAdminPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Admin Manager
              </Typography>
            </Box>
          ) : isHostPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Host Manager
              </Typography>
            </Box>
          ) : isProfilePage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <PersonRounded sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Profile
              </Typography>
            </Box>
          ) : isReservationPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <CalendarMonthIcon sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Reservation
              </Typography>
            </Box>
          ) : isPropertyPage ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <HomeIcon sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Detail room
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)",
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <WarningAmberIcon sx={{ color: "#fff", fontSize: 32 }} />
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: "#fff",
                  letterSpacing: 3,
                  textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  textTransform: "uppercase",
                }}
              >
                Không tìm thấy trang
              </Typography>
            </Box>
          )}
          <IconButton onClick={handleClick}>
            <Avatar
              alt={userName || "User"}
              src={userInfo?.thumnailUrl || "/default-avatar.png"}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              elevation: 8,
              sx: {
                width: "300px",
                mt: 1.5,
                overflow: "visible",
                borderRadius: "16px",
                transition: "all 0.2s ease-in-out",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 12,
                  height: 12,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  boxShadow: "-2px -2px 5px rgba(0,0,0,0.05)",
                },
                "& .MuiMenuItem-root": {
                  py: 1.5,
                  px: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                    transform: "translateX(4px)",
                  },
                },
                "& .MuiListItemIcon-root": {
                  minWidth: "40px",
                },
              },
            }}
          >
            {isLoggedIn ? (
              <>
                <Box
                  sx={{
                    p: 3,
                    pb: 2,
                    color: "white",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                >
                  <Avatar
                    src={userInfo?.thumnailUrl || "/default-avatar.png"}
                    sx={{
                      width: 90,
                      height: 90,
                      margin: "0 auto 1rem",
                      border: "3px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    align="center"
                    gutterBottom
                  >
                    {userInfo?.fullname || userName}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ opacity: 0.9 }}
                  >
                    {userInfo?.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ opacity: 0.9 }}
                  >
                    {userInfo?.phone}
                  </Typography>
                </Box>
                <Divider />
                {getAvailableRoles().map((role) => (
                  <MenuItem
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    selected={selectedRole === role}
                    sx={{
                      "&.Mui-selected": {
                        bgcolor: "rgba(244, 67, 54, 0.08)",
                        "&:hover": {
                          bgcolor: "rgba(244, 67, 54, 0.12)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      {role === "ADMIN" && (
                        <AdminPanelSettingsIcon
                          color={selectedRole === role ? "error" : "inherit"}
                        />
                      )}
                      {role === "HOST" && (
                        <HomeIcon
                          color={selectedRole === role ? "error" : "inherit"}
                        />
                      )}
                      {role === "USER" && (
                        <PersonRounded
                          color={selectedRole === role ? "error" : "inherit"}
                        />
                      )}
                    </ListItemIcon>
                    <Typography
                      color={selectedRole === role ? "error" : "inherit"}
                      fontWeight={selectedRole === role ? 600 : 400}
                    >
                      {role === "ADMIN" && "Trang quản trị"}
                      {role === "HOST" && "Trang Host"}
                      {role === "USER" && "Thông tin cá nhân"}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LogoutRounded color="error" />
                  </ListItemIcon>
                  <Typography color="error" fontWeight={500}>
                    Đăng xuất
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    p: 3,
                    pb: 2,
                    background:
                      "linear-gradient(45deg, #f44336 30%, #ff9800 90%)",
                    color: "white",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    align="center"
                    gutterBottom
                  >
                    Chào mừng
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ opacity: 0.9 }}
                  >
                    Đăng nhập để truy cập tài khoản của bạn
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={handleLogin}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LoginRounded color="primary" />
                  </ListItemIcon>
                  <Typography fontWeight={500}>Đăng nhập</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleSignup}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <PersonAddRounded color="primary" />
                  </ListItemIcon>
                  <Typography fontWeight={500}>Đăng ký</Typography>
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
