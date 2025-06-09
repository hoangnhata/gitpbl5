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
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Visibility as ViewIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const initialBookings = [
  {
    id: 1,
    guestName: 'Hoàng Minh Nhật',
    email: 'nhat@gmail.com',
    phone: '0123456789',
    propertyName: 'Biệt thự biển sang trọng',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    totalPrice: '5,000,000',
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: '2024-03-10'
  },
  {
    id: 2,
    guestName: 'Lê Minh Khánh',
    email: 'khanh@gmail.com',
    phone: '0987654321',
    propertyName: 'Căn hộ cao cấp view biển',
    checkIn: '2024-03-18',
    checkOut: '2024-03-25',
    totalPrice: '7,000,000',
    status: 'approved',
    paymentStatus: 'paid',
    createdAt: '2024-03-11'
  },
  {
    id: 3,
    guestName: 'Trần Phước Phú',
    email: 'phu@gmail.com',
    phone: '0369852147',
    propertyName: 'Nhà phố hiện đại',
    checkIn: '2024-03-20',
    checkOut: '2024-03-25',
    totalPrice: '3,500,000',
    status: 'rejected',
    paymentStatus: 'refunded',
    createdAt: '2024-03-12'
  },
  
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.guestName.toLowerCase().includes(searchTerm) ||
        booking.email.toLowerCase().includes(searchTerm) ||
        booking.phone.includes(searchTerm) ||
        booking.propertyName.toLowerCase().includes(searchTerm)) &&
      (statusFilter === 'all' || booking.status === statusFilter) &&
      (paymentFilter === 'all' || booking.paymentStatus === paymentFilter)
  );

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      setSnackbar({
        open: true,
        message: 'Cập nhật trạng thái thành công',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Có lỗi xảy ra khi cập nhật trạng thái',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Đã xác nhận';
      case 'rejected':
        return 'Đã từ chối';
      case 'pending':
        return 'Đang chờ';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'refunded':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          Quản lý đặt phòng
        </Typography>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Tìm kiếm..."
            variant="outlined"
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái đặt phòng</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng thái đặt phòng"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Đang chờ</MenuItem>
              <MenuItem value="approved">Đã xác nhận</MenuItem>
              <MenuItem value="rejected">Đã từ chối</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái thanh toán</InputLabel>
            <Select
              value={paymentFilter}
              label="Trạng thái thanh toán"
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Chờ thanh toán</MenuItem>
              <MenuItem value="paid">Đã thanh toán</MenuItem>
              <MenuItem value="refunded">Đã hoàn tiền</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Khách hàng</strong></TableCell>
              <TableCell><strong>Thông tin liên hệ</strong></TableCell>
              <TableCell><strong>Phòng</strong></TableCell>
              <TableCell><strong>Ngày đặt</strong></TableCell>
              <TableCell><strong>Tổng tiền</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Thanh toán</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Typography variant="subtitle2">{booking.guestName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{booking.email}</Typography>
                  <Typography variant="body2">{booking.phone}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{booking.propertyName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {booking.checkIn} - {booking.checkOut}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{booking.createdAt}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary.main" fontWeight={500}>
                    {booking.totalPrice} VNĐ
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(booking.status)}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getPaymentStatusText(booking.paymentStatus)}
                    color={getPaymentStatusColor(booking.paymentStatus)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(booking)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    {booking.status === 'pending' && (
                      <>
                        <Tooltip title="Xác nhận">
                          <IconButton
                            color="success"
                            onClick={() => handleStatusChange(booking.id, 'approved')}
                          >
                            <ApproveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Từ chối">
                          <IconButton
                            color="error"
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                          >
                            <RejectIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Chi tiết đặt phòng
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Thông tin khách hàng</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Typography><strong>Tên:</strong> {selectedBooking.guestName}</Typography>
                  <Typography><strong>Email:</strong> {selectedBooking.email}</Typography>
                  <Typography><strong>Số điện thoại:</strong> {selectedBooking.phone}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">Thông tin đặt phòng</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Typography><strong>Phòng:</strong> {selectedBooking.propertyName}</Typography>
                  <Typography><strong>Ngày nhận phòng:</strong> {selectedBooking.checkIn}</Typography>
                  <Typography><strong>Ngày trả phòng:</strong> {selectedBooking.checkOut}</Typography>
                  <Typography><strong>Tổng tiền:</strong> {selectedBooking.totalPrice} VNĐ</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Trạng thái</Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Chip
                    label={getStatusText(selectedBooking.status)}
                    color={getStatusColor(selectedBooking.status)}
                  />
                  <Chip
                    label={getPaymentStatusText(selectedBooking.paymentStatus)}
                    color={getPaymentStatusColor(selectedBooking.paymentStatus)}
                  />
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
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
