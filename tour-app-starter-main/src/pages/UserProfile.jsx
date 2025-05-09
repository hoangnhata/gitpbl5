import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Grid,
  Paper,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
  Hotel as HotelIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import PropTypes from "prop-types";

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    thumnailUrl: "", // Changed from thumbnailUrl to thumnailUrl to match API response
  });
  const [bookedRooms, setBookedRooms] = useState([]);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setFormData({
            username: userData.username || "",
            fullname: userData.fullname || "",
            email: userData.email || "",
            phone: userData.phone || "",
            thumnailUrl: userData.thumnailUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axiosInstance.get("/api/users/favorites");
      if (res.data?.result?.favorites) {
        setFavoriteRooms(res.data.result.favorites);
        setFavoriteIds(res.data.result.favorites.map((fav) => fav.id || fav));
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, thumbnailUrl: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = new FormData();
      form.append("fullname", formData.fullname);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      if (selectedFile) {
        form.append("thumnail", selectedFile);
      }

      const response = await axiosInstance.put("/api/users", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.code === 200) {
        const updatedUserData = response.data.result;
        setFormData((prev) => ({
          ...prev,
          fullname: updatedUserData.fullname,
          email: updatedUserData.email,
          phone: updatedUserData.phone,
          thumnailUrl: updatedUserData.thumnailUrl,
        }));
        setPreviewUrl("");
        setSelectedFile(null);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setSuccess(true);
        window.dispatchEvent(new Event("storage"));
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Thêm vào favorites
  const addFavorite = async (listingId) => {
    try {
      const res = await axiosInstance.post("/api/users/favorites", {
        listingId,
      });
      if (res.data.code === 200) {
        setFavoriteIds((prev) => [...prev, listingId]);
      }
    } catch (err) {
      // Có thể hiển thị thông báo lỗi nếu cần
    }
  };

  // Xóa khỏi favorites
  const deleteFavorite = async (listingId) => {
    try {
      const res = await axiosInstance.delete("/api/users/favorites", {
        data: { listingId },
      });
      if (res.data.code === 200) {
        fetchFavorites();
      }
    } catch (err) {
      // Có thể hiển thị thông báo lỗi nếu cần
    }
  };

  // Xử lý khi ấn nút tim
  const handleFavorite = (listingId) => {
    if (favoriteIds.includes(listingId)) {
      deleteFavorite(listingId);
    } else {
      addFavorite(listingId);
    }
  };

  const renderEditProfile = () => (
    <Card sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Cập nhật thông tin thành công!
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar
              alt={formData.username || "User"}
              src={previewUrl || formData.thumnailUrl || "/default-avatar.png"}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <Button
              variant="outlined"
              component="label"
              disabled={loading}
              sx={{ mb: 1 }}
            >
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
                disabled={loading}
              />
            </Button>
            {selectedFile && (
              <Typography variant="caption" color="text.secondary">
                {selectedFile.name}
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            name="username"
            label="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            disabled={true}
          />

          <TextField
            fullWidth
            name="fullname"
            label="Họ và tên"
            value={formData.fullname}
            onChange={handleChange}
            disabled={loading}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />

          <TextField
            fullWidth
            name="phone"
            label="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />

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
              "Cập nhật thông tin"
            )}
          </Button>
        </Stack>
      </form>
    </Card>
  );

  const renderBookedRooms = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Phòng đã đặt
      </Typography>
      {bookedRooms.length === 0 ? (
        <Typography color="text.secondary">Bạn chưa đặt phòng nào.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookedRooms.map((room) => (
            <Grid item xs={12} md={6} key={room.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">{room.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Check-in: {room.checkIn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check-out: {room.checkOut}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Card>
  );

  const renderFavoriteRooms = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 900, fontSize: 32 }}>
        Danh sách phòng yêu thích
      </Typography>
      {favoriteRooms.length === 0 ? (
        <Typography color="text.secondary" sx={{ fontSize: 20 }}>
          Bạn chưa thêm phòng nào vào danh sách yêu thích.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favoriteRooms.map((room) => (
            <Grid item xs={12} md={6} key={room.id}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, background 0.2s",
                  "&:hover": { boxShadow: 12, background: "#f3f6fa" },
                  minHeight: 150,
                }}
                onClick={() => navigate(`/property/${room.id}`)}
              >
                <img
                  src={`http://localhost:8080/${room.primaryThumnail}`}
                  alt={room.title}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 16,
                    marginRight: 32,
                    border: "2px solid #e0e0e0",
                    background: "#fafafa",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: 22 }}
                  >
                    {room.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 1, fontSize: 18 }}
                  >
                    Giá: <b>{room.price.toLocaleString()} VND</b> / đêm
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 16 }}
                  >
                    Thời gian: {room.startDate} - {room.endDate}
                  </Typography>
                </div>
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFavorite(room.id);
                  }}
                  sx={{ ml: 3 }}
                  title="Bỏ yêu thích"
                  size="large"
                >
                  <FavoriteIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Card>
  );

  const renderMessages = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Tin nhắn với chủ nhà
      </Typography>
      {messages.length === 0 ? (
        <Typography color="text.secondary">
          Bạn chưa có tin nhắn nào.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {messages.map((message) => (
            <Paper key={message.id} sx={{ p: 2 }}>
              <Typography variant="subtitle1">{message.hostName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {message.lastMessage}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {message.timestamp}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 8,
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thông tin cá nhân
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<EditIcon />}
              label="Chỉnh sửa thông tin"
              iconPosition="start"
            />
            <Tab
              icon={<HotelIcon />}
              label="Phòng đã đặt"
              iconPosition="start"
            />
            <Tab
              icon={<FavoriteIcon />}
              label="Yêu thích"
              iconPosition="start"
            />
            <Tab
              icon={
                <Badge badgeContent={messages.length} color="error">
                  <MessageIcon />
                </Badge>
              }
              label="Tin nhắn"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {currentTab === 0 && renderEditProfile()}
        {currentTab === 1 && renderBookedRooms()}
        {currentTab === 2 && renderFavoriteRooms()}
        {currentTab === 3 && renderMessages()}
      </Box>
    </Container>
  );
};

UserProfile.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProfile;
