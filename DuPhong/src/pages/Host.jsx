import { useState } from "react";
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
  FormControlLabel,
  Switch,
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
  LinearProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  CalendarMonth as CalendarIcon,
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
} from "@mui/icons-material";
import PropTypes from "prop-types";

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
    message: "Hi, I would like to book your villa for next week.",
    date: "2024-03-20",
  },
  {
    id: 2,
    guest: "Jane Smith",
    property: "Beach House",
    message: "Is the property available for the weekend?",
    date: "2024-03-19",
  },
];

// Add mock chat messages
const mockChatMessages = {
  1: [
    {
      id: 1,
      sender: "John Doe",
      message: "Hi, I would like to book your villa for next week.",
      timestamp: "2024-03-20T10:00:00",
      isHost: false,
    },
    {
      id: 2,
      sender: "Host",
      message:
        "Hello! Yes, the villa is available next week. What dates are you interested in?",
      timestamp: "2024-03-20T10:05:00",
      isHost: true,
    },
    {
      id: 3,
      sender: "John Doe",
      message: "I'm looking for April 1st to April 5th.",
      timestamp: "2024-03-20T10:10:00",
      isHost: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "Jane Smith",
      message: "Is the property available for the weekend?",
      timestamp: "2024-03-19T15:00:00",
      isHost: false,
    },
    {
      id: 2,
      sender: "Host",
      message: "Yes, it's available! Would you like to make a reservation?",
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

  const handleSaveProperty = () => {
    const newPropertyWithId = {
      ...newProperty,
      id: properties.length + 1,
    };
    setProperties([...properties, newPropertyWithId]);
    handleClosePropertyDialog();
    setShowSuccessAlert(true);
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
                Host Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your properties and bookings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Tooltip title="Notifications">
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
                  Add New Property
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
                placeholder="Search properties..."
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
                  Filter
                </Button>
                <Button
                  startIcon={<SortIcon />}
                  onClick={(e) => handleMenuOpen(e, { type: "sort" })}
                >
                  Sort
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
                    Total Revenue
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
                    Active Properties
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
                    Average Rating
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
                    New Messages
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Properties" />
            <Tab label="Messages" />
            <Tab label="Bookings" />
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
                    placeholder="Search messages..."
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
                          placeholder="Type a message..."
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
                      Select a conversation to start messaging
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography>Bookings management will be implemented here</Typography>
        </TabPanel>
      </Box>

      {/* Property Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleSort("price-asc")}>
          Sort by Price (Low to High)
        </MenuItem>
        <MenuItem onClick={() => handleSort("price-desc")}>
          Sort by Price (High to Low)
        </MenuItem>
        <MenuItem onClick={() => handleSort("rating")}>Sort by Rating</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleFilter("all")}>All Properties</MenuItem>
        <MenuItem onClick={() => handleFilter("active")}>
          Active Properties
        </MenuItem>
        <MenuItem onClick={() => handleFilter("inactive")}>
          Inactive Properties
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleViewStats(selectedProperty)}>
          View Statistics
        </MenuItem>
        <MenuItem onClick={() => handleShare(selectedProperty)}>
          Share Property
        </MenuItem>
        <MenuItem onClick={() => handleBookmark(selectedProperty)}>
          Save Property
        </MenuItem>
      </Menu>

      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}
        >
          Property saved successfully!
        </Alert>
      )}

      {/* Add Property Dialog */}
      <Dialog
        open={openPropertyDialog}
        onClose={handleClosePropertyDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Title"
                fullWidth
                value={newProperty.title}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, title: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
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
                label="Address"
                fullWidth
                value={newProperty.address}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                fullWidth
                value={newProperty.country}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, country: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
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
                label="End Date"
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
                label="Price per night"
                type="number"
                fullWidth
                value={newProperty.price}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, price: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Amenities
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
                Upload Images
              </Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Select Images
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
          <Button onClick={handleClosePropertyDialog}>Cancel</Button>
          <Button onClick={handleSaveProperty} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
