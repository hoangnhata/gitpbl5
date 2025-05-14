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
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [editTab, setEditTab] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    thumnailUrl: "", // Changed from thumbnailUrl to thumnailUrl to match API response
  });
  const [bookedRooms, setBookedRooms] = useState([]);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [messages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [hostRequestData, setHostRequestData] = useState({
    fullname: "",
    description: "",
    languages: "",
    address: "",
    experience: "",
    avatar: null,
  });
  const [hostRequestPreview, setHostRequestPreview] = useState("");
  const [hostRequestSuccess, setHostRequestSuccess] = useState(false);
  const [hostRequestError, setHostRequestError] = useState("");

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
          setHostRequestData((prev) => ({
            ...prev,
            fullname: userData.fullname || "",
          }));
          setHostRequestPreview(userData.thumnailUrl || "");
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
        console.log("favoriteRooms", res.data.result.favorites);
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (currentTab === 1) {
      const fetchBookedRooms = async () => {
        try {
          const res = await axiosInstance.get("/api/bookings/my");
          if (res.data?.result) {
            setBookedRooms(res.data.result);
          }
        } catch (err) {
          setBookedRooms([]);
        }
      };
      fetchBookedRooms();
    }
  }, [currentTab]);

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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) throw new Error("Không tìm thấy thông tin người dùng");
      const payload = {
        username: userData.username,
        password: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        verifyPassword: passwordData.confirmPassword,
      };
      const res = await axiosInstance.put("/api/users/password", payload);
      if (res.data.code === 200) {
        setSuccess(true);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.data.message || "Đổi mật khẩu thất bại");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Đổi mật khẩu thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHostRequestChange = (e) => {
    const { name, value } = e.target;
    setHostRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHostRequestFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHostRequestData((prev) => ({ ...prev, avatar: file }));
      setHostRequestPreview(URL.createObjectURL(file));
    }
  };

  const applyHostRequest = async ({
    country,
    language,
    didHostYear,
    description,
  }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id)
      throw new Error("Không tìm thấy thông tin người dùng");
    const payload = {
      userId: user.id,
      country,
      language,
      didHostYear,
      description,
    };
    return axiosInstance.post("/api/users/host/apply", payload);
  };

  const handleHostRequestSubmit = async (e) => {
    e.preventDefault();
    setHostRequestError("");
    setHostRequestSuccess(false);

    // Validate
    if (
      !hostRequestData.fullname ||
      !hostRequestData.description ||
      !hostRequestData.languages ||
      !hostRequestData.address ||
      !hostRequestData.experience
    ) {
      setHostRequestError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Gọi API apply host
      const res = await applyHostRequest({
        country: hostRequestData.address,
        language: hostRequestData.languages,
        didHostYear: hostRequestData.experience,
        description: hostRequestData.description,
      });
      console.log("Kết quả trả về từ API apply host:", res.data);
      setHostRequestSuccess(true);
      setTimeout(() => setHostRequestSuccess(false), 3000);
      setHostRequestData({
        fullname: "",
        description: "",
        languages: "",
        address: "",
        experience: "",
        avatar: null,
      });
      setHostRequestPreview("");
    } catch (err) {
      setHostRequestError(
        err.response?.data?.message || "Gửi yêu cầu thất bại, vui lòng thử lại."
      );
    }
  };

  const renderEditProfile = () => (
    <Card sx={{ p: 3 }}>
      <Tabs
        value={editTab}
        onChange={(_, v) => setEditTab(v)}
        sx={{ mb: 3 }}
        variant="fullWidth"
      >
        <Tab label="Chỉnh sửa thông tin" />
        <Tab label="Đổi mật khẩu" />
      </Tabs>
      {editTab === 0 ? (
        <>
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
                  src={
                    previewUrl || formData.thumnailUrl || "/default-avatar.png"
                  }
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
        </>
      ) : (
        <form onSubmit={handleChangePassword}>
          <Stack spacing={3}>
            <TextField
              label="Mật khẩu cũ"
              name="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  oldPassword: e.target.value,
                }))
              }
              required
              disabled={loading}
            />
            <TextField
              label="Mật khẩu mới"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              required
              disabled={loading}
            />
            <TextField
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              required
              disabled={loading}
            />
            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">Đổi mật khẩu thành công!</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Đổi mật khẩu"
              )}
            </Button>
          </Stack>
        </form>
      )}
    </Card>
  );

  const renderBookedRooms = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Phòng đã đặt
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ background: "#232323", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#232323" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Ảnh</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Tên chỗ ở
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Địa chỉ
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Khu vực
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Giá/đêm
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Tổng tiền
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Nhận phòng
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Trả phòng
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                bookingStatus
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedRooms.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                  sx={{ color: "#bdbdbd", py: 6 }}
                >
                  Bạn chưa đặt phòng nào.
                </TableCell>
              </TableRow>
            ) : (
              bookedRooms.map((room) => (
                <TableRow
                  key={room.bookingId}
                  sx={{
                    background: "#18191a",
                    "&:hover": { background: "#232323" },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/property/${room.listingId}`)}
                >
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={
                        room.primaryUrl
                          ? room.primaryUrl.startsWith("http")
                            ? room.primaryUrl
                            : `http://localhost:8080/${room.primaryUrl}`
                          : "/default-room.jpg"
                      }
                      alt={room.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 500 }}>
                    {room.title}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{room.address}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{room.city}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.price ? room.price.toLocaleString() : ""} VND
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.totalPrice ? room.totalPrice.toLocaleString() : ""}{" "}
                    VND
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.checkInDate}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.checkOutDate}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={room.bookingStatus}
                      sx={{
                        fontWeight: 600,
                        color: "#fff",
                        bgcolor:
                          room.bookingStatus === "PENDING"
                            ? "#fbc02d"
                            : room.bookingStatus === "CONFIRMED"
                            ? "#1976d2"
                            : room.bookingStatus === "PAID"
                            ? "#43a047"
                            : room.bookingStatus === "CANCELLED"
                            ? "#d32f2f"
                            : "#757575",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

  const renderFavoriteRooms = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 900, fontSize: 32 }}>
        Danh sách phòng yêu thích
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ background: "#232323", borderRadius: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#232323" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Ảnh</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Tên chỗ ở
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Địa chỉ
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Khu vực
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Giá/đêm
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Chủ sở hữu
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteRooms.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{ color: "#bdbdbd", py: 6 }}
                >
                  Bạn chưa thêm phòng nào vào danh sách yêu thích.
                </TableCell>
              </TableRow>
            ) : (
              favoriteRooms.map((room) => (
                <TableRow
                  key={room.id}
                  sx={{
                    background: "#18191a",
                    "&:hover": { background: "#232323" },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/property/${room.id}`)}
                >
                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={
                        room.primaryThumnail
                          ? room.primaryThumnail.startsWith("http")
                            ? room.primaryThumnail
                            : `http://localhost:8080/${room.primaryThumnail}`
                          : "/default-room.jpg"
                      }
                      alt={room.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 500 }}>
                    {room.title}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.address || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.city || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.price ? room.price.toLocaleString() : ""} VND
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {room.owner || "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFavorite(room.id);
                      }}
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 2,
                        background: "#b71c1c",
                        "&:hover": { background: "#c62828" },
                      }}
                    >
                      Bỏ yêu thích
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
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

  const renderHostRequest = () => (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Yêu cầu lên host
      </Typography>
      {hostRequestError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {hostRequestError}
        </Alert>
      )}
      {hostRequestSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Gửi yêu cầu thành công!
        </Alert>
      )}
      <form onSubmit={handleHostRequestSubmit}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              alt={hostRequestData.fullname || "Avatar"}
              src={hostRequestPreview || "/default-avatar.png"}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <Button variant="outlined" component="label" sx={{ mb: 1 }}>
              Chọn ảnh đại diện
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleHostRequestFile}
              />
            </Button>
            {hostRequestData.avatar && (
              <Typography variant="caption" color="text.secondary">
                {hostRequestData.avatar.name}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            name="fullname"
            label="Họ và tên"
            value={hostRequestData.fullname}
            onChange={handleHostRequestChange}
          />
          <TextField
            fullWidth
            name="description"
            label="Mô tả bản thân / Đội nhóm"
            value={hostRequestData.description}
            onChange={handleHostRequestChange}
            multiline
            minRows={3}
          />
          <TextField
            fullWidth
            name="languages"
            label="Ngôn ngữ sử dụng (VD: Tiếng Việt, English, ... )"
            value={hostRequestData.languages}
            onChange={handleHostRequestChange}
          />
          <TextField
            fullWidth
            name="address"
            label="Địa chỉ (Thành phố, Quốc gia)"
            value={hostRequestData.address}
            onChange={handleHostRequestChange}
          />
          <TextField
            fullWidth
            name="experience"
            label="Kinh nghiệm (VD: 8 năm Host, 24 năm ngành khách sạn, ... )"
            value={hostRequestData.experience}
            onChange={handleHostRequestChange}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Gửi yêu cầu
          </Button>
        </Stack>
      </form>
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
            <Tab
              icon={<AdminPanelSettingsIcon />}
              label="Yêu cầu lên host"
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {currentTab === 0 && renderEditProfile()}
        {currentTab === 1 && renderBookedRooms()}
        {currentTab === 2 && renderFavoriteRooms()}
        {currentTab === 3 && renderMessages()}
        {currentTab === 4 && renderHostRequest()}
      </Box>
    </Container>
  );
};

UserProfile.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProfile;
