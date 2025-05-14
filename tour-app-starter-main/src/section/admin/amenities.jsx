import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon
} from '@mui/icons-material';

const initialAmenities = [
  {
    id: 1,
    name: 'Wi-Fi',
    icon: '/icons/wifi.png',
    status: 'active',
    description: 'Kết nối internet không dây'
  },
  {
    id: 2,
    name: 'Kitchen',
    icon: '/icons/kitchen.png',
    status: 'active',
    description: 'Nhà bếp đầy đủ tiện nghi'
  },
  {
    id: 3,
    name: 'Washer',
    icon: '/icons/washer.png',
    status: 'active',
    description: 'Máy giặt'
  },
  {
    id: 4,
    name: 'Dryer',
    icon: '/icons/dryer.png',
    status: 'active',
    description: 'Máy sấy'
  },
  {
    id: 5,
    name: 'Parking',
    icon: '/icons/parking.png',
    status: 'inactive',
    description: 'Bãi đỗ xe'
  },
  {
    id: 6,
    name: 'Swimming Pool',
    icon: '/icons/pool.png',
    status: 'active',
    description: 'Hồ bơi'
  },
  {
    id: 7,
    name: 'Gym',
    icon: '/icons/gym.png',
    status: 'inactive',
    description: 'Phòng tập gym'
  },
  {
    id: 8,
    name: 'Playground',
    icon: '/icons/playground.png',
    status: 'active',
    description: 'Khu vui chơi'
  }
];

export default function AdminAmenities() {
  const [amenities, setAmenities] = useState(initialAmenities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newIcon, setNewIcon] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredAmenities = amenities.filter(
    (amenity) =>
      amenity.name.toLowerCase().includes(searchTerm) ||
      amenity.description.toLowerCase().includes(searchTerm)
  );

  const handleOpenDialog = (amenity = null) => {
    setSelectedAmenity(amenity);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAmenity(null);
  };

  const handleOpenImageDialog = (amenity) => {
    setSelectedAmenity(amenity);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedAmenity(null);
    setNewIcon(null);
  };

  const handleStatusToggle = (id) => {
    setAmenities(prev =>
      prev.map(amenity =>
        amenity.id === id
          ? { ...amenity, status: amenity.status === 'active' ? 'inactive' : 'active' }
          : amenity
      )
    );
    setSnackbar({
      open: true,
      message: 'Cập nhật trạng thái thành công',
      severity: 'success'
    });
  };

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewIcon(URL.createObjectURL(file));
    }
  };

  const handleSaveIcon = async () => {
    try {
      setLoading(true);
    

      setAmenities(prev =>
        prev.map(amenity =>
          amenity.id === selectedAmenity.id
            ? { ...amenity, icon: newIcon }
            : amenity
        )
      );

      setSnackbar({
        open: true,
        message: 'Cập nhật icon thành công',
        severity: 'success'
      });
      handleCloseImageDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi cập nhật icon',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Đang hoạt động' : 'Không hoạt động';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          Quản lý tiện nghi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm tiện nghi mới
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Tìm kiếm tiện nghi..."
        variant="outlined"
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredAmenities.map((amenity) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={amenity.id}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    component="img"
                    src={amenity.icon}
                    alt={amenity.name}
                    sx={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'contain',
                      mb: 2
                    }}
                  />
                  <Typography variant="h6" align="center">
                    {amenity.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {amenity.description}
                  </Typography>
                  <Chip
                    label={getStatusText(amenity.status)}
                    color={getStatusColor(amenity.status)}
                    size="small"
                    sx={{ alignSelf: 'center' }}
                  />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Thay đổi icon">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenImageDialog(amenity)}
                      >
                        <UploadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(amenity)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={amenity.status === 'active' ? 'Tắt hoạt động' : 'Bật hoạt động'}>
                      <IconButton
                        color={amenity.status === 'active' ? 'error' : 'success'}
                        onClick={() => handleStatusToggle(amenity.id)}
                      >
                        {amenity.status === 'active' ? <InactiveIcon /> : <ActiveIcon />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Thay đổi icon cho {selectedAmenity?.name}
            </Typography>
            <IconButton onClick={handleCloseImageDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box
              component="img"
              src={newIcon || selectedAmenity?.icon}
              alt="Current icon"
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1
              }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
            >
              Chọn ảnh mới
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleIconUpload}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSaveIcon}
            disabled={!newIcon || loading}
          >
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

     
     
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
