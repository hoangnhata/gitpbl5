import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  LinearProgress,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Hotel as HotelIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";

// Mock data for demonstration
const mockCountries = [
  {
    id: 1,
    name: "Việt Nam",
    code: "VN",
    description: "Đất nước với vẻ đẹp thiên nhiên phong phú và văn hóa đa dạng",
    totalProperties: 150,
    totalHomestays: 80,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    popularCities: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Nha Trang"],
    status: "active",
    rating: 4.8,
    trending: true,
    occupancyRate: 85,
  },
  {
    id: 2,
    name: "Thái Lan",
    code: "TH",
    description: "Xứ sở của những nụ cười và văn hóa Phật giáo",
    totalProperties: 120,
    totalHomestays: 65,
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    popularCities: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya"],
    status: "active",
    rating: 4.6,
    trending: true,
    occupancyRate: 78,
  },
];

export default function AdminCountries() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    image: "",
    popularCities: [],
  });

  useEffect(() => {
    setCountries(mockCountries);
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredCountries = countries
    .filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "properties":
          return b.totalProperties - a.totalProperties;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleOpenDialog = (country = null) => {
    if (country) {
      setSelectedCountry(country);
      setFormData({
        name: country.name,
        code: country.code,
        description: country.description,
        image: country.image,
        popularCities: country.popularCities,
      });
    } else {
      setSelectedCountry(null);
      setFormData({
        name: "",
        code: "",
        description: "",
        image: "",
        popularCities: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCountry(null);
  };

  const handleSubmit = () => {
    if (selectedCountry) {
      const updatedCountries = countries.map((country) =>
        country.id === selectedCountry.id
          ? { ...country, ...formData }
          : country
      );
      setCountries(updatedCountries);
    } else {
      const newCountry = {
        id: countries.length + 1,
        ...formData,
        totalProperties: 0,
        totalHomestays: 0,
        status: "active",
        rating: 0,
        trending: false,
        occupancyRate: 0,
      };
      setCountries([...countries, newCountry]);
    }
    setShowSuccessAlert(true);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa quốc gia này?")) {
      const updatedCountries = countries.filter((country) => country.id !== id);
      setCountries(updatedCountries);
      setShowSuccessAlert(true);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FlagIcon color="primary" /> Quản lý Quốc gia
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Thêm Quốc gia
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Tìm kiếm quốc gia..."
          variant="outlined"
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ borderRadius: 2 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            value={sortBy}
            label="Sắp xếp theo"
            onChange={(e) => setSortBy(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="name">Tên</MenuItem>
            <MenuItem value="properties">Số lượng căn hộ</MenuItem>
            <MenuItem value="rating">Đánh giá</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} md={6} key={country.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={country.image}
                  alt={country.name}
                />
                {country.trending && (
                  <Chip
                    icon={<TrendingUpIcon />}
                    label="Đang thịnh hành"
                    color="secondary"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600 }}
                  >
                    {country.name}
                  </Typography>
                  <Chip
                    icon={<StarIcon />}
                    label={country.rating.toFixed(1)}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {country.description}
                </Typography>

                <Stack direction="row" spacing={2} mb={2}>
                  <Chip
                    icon={<HomeIcon />}
                    label={`${country.totalProperties} căn hộ`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<HotelIcon />}
                    label={`${country.totalHomestays} homestay`}
                    variant="outlined"
                  />
                </Stack>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tỷ lệ lấp đầy:
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={country.occupancyRate}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {country.occupancyRate}%
                  </Typography>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Thành phố phổ biến:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {country.popularCities.map((city, index) => (
                    <Chip
                      key={index}
                      size="small"
                      icon={<LocationIcon />}
                      label={city}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Tooltip title="Chỉnh sửa">
                  <IconButton
                    onClick={() => handleOpenDialog(country)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton
                    onClick={() => handleDelete(country.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          {selectedCountry ? "Chỉnh sửa Quốc gia" : "Thêm Quốc gia mới"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên quốc gia"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mã quốc gia"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL hình ảnh"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Thành phố phổ biến (phân cách bằng dấu phẩy)"
                value={formData.popularCities.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    popularCities: e.target.value
                      .split(",")
                      .map((city) => city.trim()),
                  })
                }
                helperText="Nhập các thành phố phổ biến, phân cách bằng dấu phẩy"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={selectedCountry ? <EditIcon /> : <AddIcon />}
          >
            {selectedCountry ? "Cập nhật" : "Thêm mới"}
          </Button>
        </Box>
      </Dialog>

      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {selectedCountry
            ? "Cập nhật quốc gia thành công!"
            : "Thêm quốc gia mới thành công!"}
        </Alert>
      )}
    </Box>
  );
}
