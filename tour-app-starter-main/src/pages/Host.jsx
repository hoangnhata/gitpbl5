import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Chip,
  ImageList,
  ImageListItem,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Alert,
  InputAdornment,
  Select,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Visibility as VisibilityIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Home as HomeIcon,
  Hotel as HotelIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosConfig";

// Mock data for demonstration
const mockProperties = [
  {
    id: 1,
    title: "Nhà cho thuê",
    description:
      "Có 5 loại phòng trong biệt thự Ngân Phú: Phòng đôi, phòng 3 người, phòng đơn, phòng 2 giường đơn và phòng 4 người.\nNằm ở vị trí lý tưởng ở một vị trí tuyệt vời chỉ cách trung tâm Hội An 2 km và cách bãi biển Cửa Đại 2 km,\nvới phòng hiện đại đẹp mắt và hiện đại yên tĩnh tuyệt đẹp, nhà của chúng tôi là nơi tốt nhất ở Hội An\ncho những ai muốn tận hưởng một kỳ nghỉ thoải mái trong bầu không khí ấm cúng như ở nhà.",
    address: "Phố Cổ Hội An",
    country: "Việt Nam",
    avgStart: 4.5,
    hostThumnailUrl: null,
    popular: true,
    startDate: "2025-04-13",
    endDate: "2025-07-01",
    price: 100.5,
    images: ["uploads/anh11.png", "uploads/anh22.png"],
    amenites: [
      {
        thumnailUrl: "/uploads/huongnhinravuon.png",
        name: "Hướng nhìn ra vườn",
      },
      {
        thumnailUrl: "/uploads/huongnhinranuii.png",
        name: "Hướng nhìn ra núi",
      },
      {
        thumnailUrl: "/uploads/bep.png",
        name: "Bếp",
      },
      {
        thumnailUrl: "/uploads/chodoxxemienphi.png",
        name: "Chỗ đỗ xe miễn phí tại nơi ở",
      },
      {
        thumnailUrl: "/uploads/maygiat.png",
        name: "Máy giặt",
      },
      {
        thumnailUrl: "/uploads/output_wifi.png",
        name: "Wifi",
      },
      {
        thumnailUrl: "/uploads/hoboichung.png",
        name: "Hồ bơi chung",
      },
      {
        thumnailUrl: "/uploads/tivi.png",
        name: "Ti vi",
      },
    ],
  },
];

const mockMessages = [
  {
    id: 1,
    guest: "John Doe",
    property: "Nhà cho thuê",
    message: "Xin chào, tôi muốn đặt biệt thự của bạn cho tuần tới.",
    date: "2024-03-20",
  },
  {
    id: 2,
    guest: "Jane Smith",
    property: "Nhà bãi biển",
    message: "Tài sản có sẵn cho cuối tuần không?",
    date: "2024-03-19",
  },
];

// Add mock chat messages
const mockChatMessages = {
  1: [
    {
      id: 1,
      sender: "John Doe",
      message: "Xin chào, tôi muốn đặt biệt thự của bạn cho tuần tới.",
      timestamp: "2024-03-20T10:00:00",
      isHost: false,
    },
    {
      id: 2,
      sender: "Host",
      message:
        "Xin chào! Vâng, biệt thự có sẵn cho tuần tới. Bạn quan tâm đến những ngày nào?",
      timestamp: "2024-03-20T10:05:00",
      isHost: true,
    },
    {
      id: 3,
      sender: "John Doe",
      message: "Tôi đang tìm từ ngày 1 tháng 4 đến ngày 5 tháng 4.",
      timestamp: "2024-03-20T10:10:00",
      isHost: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Jane Smith",
      message: "Tài sản có sẵn cho cuối tuần không?",
      timestamp: "2024-03-19T15:00:00",
      isHost: false,
    },
    {
      id: 2,
      sender: "Host",
      message: "Vâng, nó có sẵn! Bạn có muốn đặt phòng không?",
      timestamp: "2024-03-19T15:05:00",
      isHost: true,
    },
  ],
};

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function HostPage() {
  const [tabValue, setTabValue] = useState(0);
  const [properties, setProperties] = useState(mockProperties);
  const [messages] = useState(mockMessages);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [openPropertyDialog, setOpenPropertyDialog] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    description: "",
    address: "",
    country: "",
    avgStart: 0,
    popular: false,
    startDate: "",
    endDate: "",
    price: "",
    images: [],
    amenites: [],
  });

  useEffect(() => {
    axiosInstance.get("/api/countries").then((res) => {
      setCountryOptions(res.data.result.map((c) => c.name));
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddProperty = () => {
    setOpenPropertyDialog(true);
  };

  const handleClosePropertyDialog = () => {
    setOpenPropertyDialog(false);
    setNewProperty({
      title: "",
      description: "",
      address: "",
      country: "",
      avgStart: 0,
      popular: false,
      startDate: "",
      endDate: "",
      price: "",
      images: [],
      amenites: [],
    });
  };

  const handleSaveProperty = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newProperty.title);
      formData.append("description", newProperty.description);
      formData.append("address", newProperty.address);
      formData.append("country", newProperty.country);
      formData.append("city", newProperty.city);
      formData.append("price", newProperty.price);
      formData.append("area", newProperty.area);
      formData.append("startDate", newProperty.startDate);
      formData.append("endDate", newProperty.endDate);
      formData.append(
        "amenites",
        newProperty.amenites.map((a) => a.name).join(",")
      );
      // Thêm từng file ảnh
      imageFiles.forEach((file) => {
        formData.append("imgs", file);
      });

      // Gửi request
      const res = await axiosInstance.post("/api/listings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code === 200) {
        setShowSuccessAlert(true);
        handleClosePropertyDialog();
        // Có thể gọi lại API lấy danh sách tài sản mới nhất ở đây
      } else {
        alert(res.data.message || "Đăng tài sản thất bại!");
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi đăng tài sản!");
    }
  };

  const handleMenuOpen = (event, property) => {
    setAnchorEl(event.currentTarget);
    setSelectedProperty(property);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProperty(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (value) => {
    setSortBy(value);
    handleMenuClose();
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    handleMenuClose();
  };

  const handleShare = (property) => {
    // Implement share functionality
    console.log("Sharing property:", property);
    handleMenuClose();
  };

  const handleBookmark = (property) => {
    // Implement bookmark functionality
    console.log("Bookmarking property:", property);
    handleMenuClose();
  };

  const handleViewStats = (property) => {
    // Implement view stats functionality
    console.log("Viewing stats for property:", property);
    handleMenuClose();
  };

  const handleOpenChat = (message) => {
    setSelectedChat(message.id);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.avgStart - a.avgStart;
      default:
        return b.id - a.id;
    }
  });

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setNewProperty({
      ...newProperty,
      images: files.map((file) => URL.createObjectURL(file)),
    });
  };

  // Ensure handleSendMessage is defined
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    const newChatMessage = {
      id: Date.now(),
      sender: "Host",
      message: newMessage,
      timestamp: new Date().toISOString(),
      isHost: true,
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newChatMessage],
    }));
    setNewMessage("");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{ p: 3, mb: 3, bgcolor: "background.default" }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Bảng điều khiển chủ nhà
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Quản lý tài sản và đặt phòng của bạn
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Tooltip title="Thông báo">
                  <IconButton>
                    <Badge badgeContent={3} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddProperty}
                >
                  Thêm tài sản mới
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Search and Filter Section */}
        <Paper
          elevation={0}
          sx={{ p: 2, mb: 3, bgcolor: "background.default" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm tài sản..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  startIcon={<FilterIcon />}
                  onClick={(e) => handleMenuOpen(e, { type: "filter" })}
                >
                  Lọc
                </Button>
                <Button
                  startIcon={<SortIcon />}
                  onClick={(e) => handleMenuOpen(e, { type: "sort" })}
                >
                  Sắp xếp
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <MoneyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    ${properties.reduce((sum, p) => sum + p.price, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tổng doanh thu
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <VisibilityIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{properties.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tài sản đang hoạt động
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "warning.main" }}>
                  <StarIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {(
                      properties.reduce((sum, p) => sum + p.avgStart, 0) /
                      properties.length
                    ).toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đánh giá trung bình
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <MessageIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">{messages.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tin nhắn mới
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<HomeIcon />} label="Tài sản" iconPosition="start" />
            <Tab icon={<MessageIcon />} label="Tin nhắn" iconPosition="start" />
            <Tab icon={<HotelIcon />} label="Đặt phòng" iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {sortedProperties.map((property) => (
              <Grid item xs={12} md={6} key={property.id}>
                <Card sx={{ p: 2 }}>
                  <Box sx={{ position: "relative" }}>
                    <ImageList
                      sx={{ width: "100%", height: 200 }}
                      cols={2}
                      rowHeight={200}
                    >
                      {property.images.map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={image}
                            alt={`Property ${index + 1}`}
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, property)}
                        sx={{ bgcolor: "background.paper" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">{property.title}</Typography>
                    <Typography color="textSecondary">
                      {property.address}, {property.country}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Rating
                        value={property.avgStart}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {property.avgStart}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${property.price}/night
                    </Typography>

                    <Box
                      sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                    >
                      {property.amenites.map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity.name}
                          size="small"
                          avatar={<Avatar src={amenity.thumnailUrl} />}
                        />
                      ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        size="small"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        size="small"
                        onClick={() => handleShare(property)}
                      >
                        Share
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<BookmarkIcon />}
                        size="small"
                        onClick={() => handleBookmark(property)}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {/* Chat List */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ height: "calc(100vh - 200px)", overflow: "auto" }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm tin nhắn..."
                    InputProps={{
                      startAdornment: (
                        <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  />
                </Box>
                <List>
                  {messages.map((message) => (
                    <ListItem
                      key={message.id}
                      button
                      onClick={() => handleOpenChat(message)}
                      selected={selectedChat === message.id}
                      sx={{
                        "&.Mui-selected": {
                          bgcolor: "action.selected",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>{message.guest[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.guest}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: "block" }}
                            >
                              {message.property}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {message.message}
                            </Typography>
                          </>
                        }
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.date).toLocaleDateString()}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Chat Window */}
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  height: "calc(100vh - 200px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: "background.default",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar>
                          {
                            messages.find((m) => m.id === selectedChat)
                              ?.guest[0]
                          }
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {messages.find((m) => m.id === selectedChat)?.guest}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {
                              messages.find((m) => m.id === selectedChat)
                                ?.property
                            }
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Chat Messages */}
                    <Box
                      sx={{
                        flexGrow: 1,
                        overflow: "auto",
                        p: 2,
                        bgcolor: "grey.50",
                      }}
                    >
                      <Stack spacing={2}>
                        {chatMessages[selectedChat]?.map((msg) => (
                          <Box
                            key={msg.id}
                            sx={{
                              display: "flex",
                              justifyContent: msg.isHost
                                ? "flex-end"
                                : "flex-start",
                            }}
                          >
                            <Box
                              sx={{
                                maxWidth: "70%",
                                bgcolor: msg.isHost
                                  ? "primary.main"
                                  : "background.paper",
                                color: msg.isHost
                                  ? "primary.contrastText"
                                  : "text.primary",
                                p: 2,
                                borderRadius: 2,
                                boxShadow: 1,
                              }}
                            >
                              <Typography variant="body1">
                                {msg.message}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ opacity: 0.7 }}
                              >
                                {formatTimestamp(msg.timestamp)}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Message Input */}
                    <Box
                      sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: "divider",
                        bgcolor: "background.default",
                      }}
                    >
                      <Stack direction="row" spacing={1}>
                        <IconButton>
                          <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                          <EmojiIcon />
                        </IconButton>
                        <TextField
                          fullWidth
                          placeholder="Nhập tin nhắn..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  color="primary"
                                  onClick={handleSendMessage}
                                  disabled={!newMessage.trim()}
                                >
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.50",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      Chọn một cuộc trò chuyện để bắt đầu nhắn tin
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography>
            Tính năng quản lý đặt phòng sẽ được triển khai ở đây
          </Typography>
        </TabPanel>
      </Box>

      {/* Property Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSort("price-asc")}>
          Sắp xếp theo giá (Thấp đến cao)
        </MenuItem>
        <MenuItem onClick={() => handleSort("price-desc")}>
          Sắp xếp theo giá (Cao đến thấp)
        </MenuItem>
        <MenuItem onClick={() => handleSort("rating")}>
          Sắp xếp theo đánh giá
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleFilter("all")}>Tất cả tài sản</MenuItem>
        <MenuItem onClick={() => handleFilter("active")}>
          Tài sản đang hoạt động
        </MenuItem>
        <MenuItem onClick={() => handleFilter("inactive")}>
          Tài sản không hoạt động
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleViewStats(selectedProperty)}>
          Xem thống kê
        </MenuItem>
        <MenuItem onClick={() => handleShare(selectedProperty)}>
          Chia sẻ tài sản
        </MenuItem>
        <MenuItem onClick={() => handleBookmark(selectedProperty)}>
          Lưu tài sản
        </MenuItem>
      </Menu>

      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}
        >
          Đã lưu tài sản thành công!
        </Alert>
      )}

      {/* Add Property Dialog */}
      <Dialog
        open={openPropertyDialog}
        onClose={handleClosePropertyDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Thêm tài sản mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Tiêu đề"
                fullWidth
                value={newProperty.title}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mô tả"
                fullWidth
                multiline
                rows={4}
                value={newProperty.description}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Địa chỉ"
                fullWidth
                value={newProperty.address}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Thành phố"
                fullWidth
                value={newProperty.city}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                displayEmpty
                value={newProperty.country}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, country: e.target.value })
                }
                renderValue={(selected) => selected || "Chọn quốc gia"}
              >
                <MenuItem value="" disabled>
                  Chọn quốc gia
                </MenuItem>
                {countryOptions.map((country, idx) => (
                  <MenuItem key={idx} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Ngày bắt đầu"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newProperty.startDate}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, startDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Ngày kết thúc"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newProperty.endDate}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, endDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Giá mỗi đêm"
                type="number"
                fullWidth
                value={newProperty.price}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, price: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Diện tích"
                type="number"
                fullWidth
                value={newProperty.area}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, area: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Tiện nghi
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {mockProperties[0].amenites.map((amenity, index) => (
                  <Chip
                    key={index}
                    label={amenity.name}
                    onClick={() => {
                      const newAmenities = [...newProperty.amenites];
                      const existingIndex = newAmenities.findIndex(
                        (a) => a.name === amenity.name
                      );
                      if (existingIndex === -1) {
                        newAmenities.push(amenity);
                      } else {
                        newAmenities.splice(existingIndex, 1);
                      }
                      setNewProperty({
                        ...newProperty,
                        amenites: newAmenities,
                      });
                    }}
                    color={
                      newProperty.amenites.some((a) => a.name === amenity.name)
                        ? "primary"
                        : "default"
                    }
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Tải lên hình ảnh
              </Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Chọn hình ảnh
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                {imageFiles.length > 0
                  ? imageFiles.map((file, idx) => (
                      <Box
                        key={idx}
                        sx={{ width: 100, height: 100, position: "relative" }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${idx}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    ))
                  : newProperty.images.map((img, idx) => (
                      <Box
                        key={idx}
                        sx={{ width: 100, height: 100, position: "relative" }}
                      >
                        <img
                          src={img}
                          alt={`preview-${idx}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    ))}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePropertyDialog}>Hủy</Button>
          <Button onClick={handleSaveProperty} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
