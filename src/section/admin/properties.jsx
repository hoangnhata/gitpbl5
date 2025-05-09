import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  InputLabel,
  FormControl,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  Rating,
  ImageList,
  ImageListItem,
  Divider
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Close as CloseIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Warning as WarningIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import villa1 from './pic/nhatrang_beach.jpg';
import villa2 from './pic/nhatrang_pool.jpg';
import apartment1 from './pic/danang_city.jpg';
import apartment2 from './pic/danang_modern.jpg';
import cabin1 from './pic/sapa_moutain.jpg';
import cabin2 from './pic/sapa_wood.jpg';

const mockProperties = [
  {
    id: 1,
    name: 'Villa Nha Trang',
    location: 'Nha Trang',
    price: '2,000,000 VND',
    owner: 'Chủ A',
    status: 'Đang chờ duyệt',
    rating: 4.5,
    images: [villa1, villa2],
    description: 'Villa sang trọng với view biển tuyệt đẹp',
    amenities: ['Hồ bơi', 'Wifi', 'Bếp', 'Điều hòa'],
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-15',
    violations: [],
    reports: []
  },
  {
    id: 2,
    name: 'Căn hộ Đà Nẵng',
    location: 'Đà Nẵng',
    price: '1,200,000 VND',
    owner: 'Chủ B',
    status: 'Đã duyệt',
    rating: 4.8,
    images: [apartment1, apartment2],
    description: 'Căn hộ hiện đại giữa trung tâm thành phố',
    amenities: ['Gym', 'Wifi', 'Bảo vệ 24/7', 'Thang máy'],
    createdAt: '2024-02-15',
    lastUpdated: '2024-03-10',
    violations: ['Vi phạm quy định về hình ảnh'],
    reports: ['Báo cáo từ người dùng về vấn đề vệ sinh']
  },
  {
    id: 3,
    name: 'Nhà gỗ Sapa',
    location: 'Sapa',
    price: '1,500,000 VND',
    owner: 'Chủ A',
    status: 'Đã duyệt',
    rating: 4.2,
    images: [cabin1, cabin2],
    description: 'Nhà gỗ ấm cúng với view núi rừng',
    amenities: ['Lò sưởi', 'Wifi', 'Bếp', 'Vườn'],
    createdAt: '2024-01-20',
    lastUpdated: '2024-03-05',
    violations: [],
    reports: []
  }
];

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setProperties(mockProperties);
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleOwnerChange = (e) => setOwnerFilter(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  const filteredData = properties.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)) &&
      (ownerFilter === 'all' || item.owner.toLowerCase().includes(ownerFilter.toLowerCase())) &&
      (statusFilter === 'all' || item.status === statusFilter)
  );

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProperty(null);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updatedProperties = properties.map(property =>
      property.id === id ? { ...property, status: newStatus } : property
    );
    setProperties(updatedProperties);
    setShowSuccessAlert(true);
    handleCloseDialog();
  };

  const handleRemoveProperty = (id) => {
    const updatedProperties = properties.filter(property => property.id !== id);
    setProperties(updatedProperties);
    setShowSuccessAlert(true);
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã duyệt':
        return 'success';
      case 'Đang chờ duyệt':
        return 'warning';
      case 'Đã từ chối':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Quản lý chỗ ở
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField 
          label="Tìm kiếm chỗ ở..." 
          variant="outlined" 
          onChange={handleSearchChange}
          fullWidth
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Chủ sở hữu</InputLabel>
          <Select value={ownerFilter} label="Chủ sở hữu" onChange={handleOwnerChange}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Chủ A">Chủ A</MenuItem>
            <MenuItem value="Chủ B">Chủ B</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select value={statusFilter} label="Trạng thái" onChange={handleStatusChange}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Đang chờ duyệt">Đang chờ duyệt</MenuItem>
            <MenuItem value="Đã duyệt">Đã duyệt</MenuItem>
            <MenuItem value="Đã từ chối">Đã từ chối</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              {['Ảnh', 'Tên chỗ ở', 'Địa điểm', 'Giá', 'Chủ sở hữu', 'Trạng thái', 'Đánh giá', 'Hành động'].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: 600 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={item.images[0]}
                    alt={item.name}
                    sx={{
                      width: '100px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.status}
                    color={getStatusColor(item.status)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={item.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({item.rating})
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SettingsIcon />}
                    onClick={() => handleViewDetails(item)}
                  >
                    Xử lý
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Chi tiết chỗ ở
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Grid container spacing={3} sx={{ mt: 1 }}>


              <Grid item xs={12}>
                <ImageList sx={{ height: 200 }} cols={2} rowHeight={200}>
                  {selectedProperty.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        loading="lazy"
                        style={{ objectFit: 'cover' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>


              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Typography variant="h6">{selectedProperty.name}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationIcon color="action" />
                    <Typography>{selectedProperty.location}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon color="action" />
                    <Typography>Chủ sở hữu: {selectedProperty.owner}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarIcon color="action" />
                    <Typography>Ngày tạo: {selectedProperty.createdAt}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <StarIcon color="action" />
                    <Typography>Đánh giá: {selectedProperty.rating}/5</Typography>
                  </Stack>
                </Stack>
              </Grid>


              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Mô tả
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProperty.description}
                </Typography>
              </Grid>


              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Tiện nghi
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {selectedProperty.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      label={amenity}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Grid>


              {(selectedProperty.violations.length > 0 || selectedProperty.reports.length > 0) && (
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    {selectedProperty.violations.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" color="error" gutterBottom>
                          Vi phạm
                        </Typography>
                        {selectedProperty.violations.map((violation, index) => (
                          <Stack key={index} direction="row" spacing={1} alignItems="center">
                            <WarningIcon color="error" />
                            <Typography variant="body2">{violation}</Typography>
                          </Stack>
                        ))}
                      </Box>
                    )}
                    {selectedProperty.reports.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" color="warning.main" gutterBottom>
                          Báo cáo
                        </Typography>
                        {selectedProperty.reports.map((report, index) => (
                          <Stack key={index} direction="row" spacing={1} alignItems="center">
                            <WarningIcon color="warning" />
                            <Typography variant="body2">{report}</Typography>
                          </Stack>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Grid>
              )}


              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  {selectedProperty.status === 'Đang chờ duyệt' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ApproveIcon />}
                        onClick={() => handleStatusUpdate(selectedProperty.id, 'Đã duyệt')}
                      >
                        Duyệt
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<RejectIcon />}
                        onClick={() => handleStatusUpdate(selectedProperty.id, 'Đã từ chối')}
                      >
                        Từ chối
                      </Button>
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveProperty(selectedProperty.id)}
                  >
                    Gỡ bỏ
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>


      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}
        >
          Cập nhật trạng thái thành công!
        </Alert>
      )}
    </Box>
  );
}
