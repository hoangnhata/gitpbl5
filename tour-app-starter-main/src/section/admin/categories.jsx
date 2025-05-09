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

const initialCategories = [
  {
    id: 1,
    name: 'Công viên quốc gia',
    icon: '/icons/national-park.png',
    status: 'active',
    description: 'Khám phá vẻ đẹp thiên nhiên hoang dã'
  },
  {
    id: 2,
    name: 'Biểu tượng',
    icon: '/icons/iconic.png',
    status: 'active',
    description: 'Những địa điểm nổi tiếng, biểu tượng'
  },
  {
    id: 3,
    name: 'Thiết kế',
    icon: '/icons/design.png',
    status: 'active',
    description: 'Không gian được thiết kế độc đáo'
  },
  {
    id: 4,
    name: 'Mới',
    icon: '/icons/new.png',
    status: 'active',
    description: 'Những địa điểm mới được thêm vào'
  },
  {
    id: 5,
    name: 'Vui chơi',
    icon: '/icons/play.png',
    status: 'inactive',
    description: 'Khu vui chơi giải trí'
  },
  {
    id: 6,
    name: 'Hướng biển',
    icon: '/icons/beach.png',
    status: 'active',
    description: 'View biển tuyệt đẹp'
  },
  {
    id: 7,
    name: 'Phòng',
    icon: '/icons/room.png',
    status: 'inactive',
    description: 'Các loại phòng nghỉ'
  },
  {
    id: 8,
    name: 'Hồ bơi tuyệt đẹp',
    icon: '/icons/pool.png',
    status: 'active',
    description: 'Hồ bơi sang trọng, view đẹp'
  }
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newIcon, setNewIcon] = useState(null);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm) ||
      category.description.toLowerCase().includes(searchTerm)
  );

  const handleOpenDialog = (category = null) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleOpenImageDialog = (category) => {
    setSelectedCategory(category);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedCategory(null);
    setNewIcon(null);
  };

  const handleStatusToggle = (id) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id
          ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
          : category
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCategories(prev =>
        prev.map(category =>
          category.id === selectedCategory.id
            ? { ...category, icon: newIcon }
            : category
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
          Quản lý danh mục
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm danh mục mới
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Tìm kiếm danh mục..."
        variant="outlined"
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    component="img"
                    src={category.icon}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'contain',
                      mb: 2
                    }}
                  />
                  <Typography variant="h6" align="center">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {category.description}
                  </Typography>
                  <Chip
                    label={getStatusText(category.status)}
                    color={getStatusColor(category.status)}
                    size="small"
                    sx={{ alignSelf: 'center' }}
                  />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Thay đổi icon">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenImageDialog(category)}
                      >
                        <UploadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(category)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={category.status === 'active' ? 'Tắt hoạt động' : 'Bật hoạt động'}>
                      <IconButton
                        color={category.status === 'active' ? 'error' : 'success'}
                        onClick={() => handleStatusToggle(category.id)}
                      >
                        {category.status === 'active' ? <InactiveIcon /> : <ActiveIcon />}
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
              Thay đổi icon cho {selectedCategory?.name}
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
              src={newIcon || selectedCategory?.icon}
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
