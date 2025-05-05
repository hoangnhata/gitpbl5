import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Stack,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../components/Logo";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "remember" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login with:", { username: formData.username }); // Debug log

      const response = await axios.post(
        "/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      if (response.data.code === 200) {
        const { accessToken, refreshToken, name } = response.data.result;

        // Store tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userName", name);

        // Set default authorization header
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Store user data
        localStorage.setItem("user", JSON.stringify(response.data.result));

        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(response.data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err.message,
      });

      if (!err.response) {
        setError(
          "Unable to connect to the server. Please check your internet connection."
        );
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Invalid username or password");
      } else {
        setError(err.response?.data?.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          py: 12,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Logo sx={{ mb: 5 }} />

        <Typography variant="h4" paragraph>
          Sign in to Rhythm
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
          Don&apos;t have an account? {""}
          <RouterLink
            to="/signup"
            style={{ color: "primary.main", textDecoration: "none" }}
          >
            Get started
          </RouterLink>
        </Typography>

        <Card sx={{ p: 3, width: "100%" }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Login successful! Redirecting to home page...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                error={!!error}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                disabled={loading}
                error={!!error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Remember me"
              />

              <RouterLink
                to="/reset-password"
                style={{ color: "primary.main", textDecoration: "none" }}
              >
                Forgot password?
              </RouterLink>
            </Stack>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
