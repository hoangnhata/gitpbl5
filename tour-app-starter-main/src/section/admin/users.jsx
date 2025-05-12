import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const mockUsers = [
  {
    id: 1,
    name: 'Hoàng Minh Nhật',
    username: 'nhat123',
    email: 'nhat@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động',
    phone: '0123456789',
    address: 'Hà Nội',
    createdAt: '2024-01-01',
    lastLogin: '2024-03-20',
    avatar: 'https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg'
  },
  {
    id: 2,
    name: 'Lê Minh Khánh',
    username: 'khanh456',
    email: 'khanh@gmail.com',
    role: 'Chủ cho thuê',
    status: 'Bị khóa',
    phone: '0987654321',
    address: 'TP.HCM',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-19',
    avatar: 'https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg'
  },
  {
    id: 3,
    name: 'Trần Phước Phú',
    username: 'phu789',
    email: 'c@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động',
    phone: '0123456789',
    address: 'Đà Nẵng',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-18',
    avatar: 'https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg'
  }
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAction = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setOpenDialog(true);
    setEditMode(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setEditedUser(null);
    setEditMode(false);
  };

  const handleSaveChanges = () => {
    const updatedUsers = users.map(user => 
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setShowSuccessAlert(true);
    handleCloseDialog();
  };

  const handleStatusChange = (event) => {
    setEditedUser({
      ...editedUser,
      status: event.target.checked ? 'Hoạt động' : 'Bị khóa'
    });
  };

  const handleRoleChange = (event) => {
    setEditedUser({
      ...editedUser,
      role: event.target.value
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Quản lý người dùng
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Select 
          value={roleFilter} 
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="Khách thuê">Khách thuê</MenuItem>
          <MenuItem value="Chủ cho thuê">Chủ cho thuê</MenuItem>
        </Select>
        <Select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">Trạng thái</MenuItem>
          <MenuItem value="Hoạt động">Hoạt động</MenuItem>
          <MenuItem value="Bị khóa">Bị khóa</MenuItem>
        </Select>
      </Stack>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Ảnh đại diện</strong></TableCell>
              <TableCell><strong>Họ tên</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Loại tài khoản</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Typography 
                    color={user.status === 'Hoạt động' ? 'success.main' : 'error.main'}
                    fontWeight={500}
                  >
                    {user.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(user)}
                  >
                    Xử lý
                  </Button>
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
              {editMode ? 'Chỉnh sửa thông tin người dùng' : 'Thông tin người dùng'}
            </Typography>
            <Stack direction="row" spacing={1}>
              {!editMode && (
                <Tooltip title="Chỉnh sửa">
                  <IconButton onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={editedUser?.avatar}
                alt={editedUser?.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editedUser?.status === 'Hoạt động'}
                    onChange={handleStatusChange}
                    disabled={!editMode}
                  />
                }
                label={
                  <Typography 
                    color={editedUser?.status === 'Hoạt động' ? 'success.main' : 'error.main'}
                    fontWeight={500}
                  >
                    {editedUser?.status === 'Hoạt động' ? 'Đang hoạt động' : 'Đã khóa'}
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                name="username"
                value={editedUser?.username || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Họ tên"
                name="name"
                value={editedUser?.name || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editedUser?.email || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={editedUser?.phone || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={editedUser?.address || ''}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Loại tài khoản</InputLabel>
                <Select
                  value={editedUser?.role || ''}
                  onChange={handleRoleChange}
                  label="Loại tài khoản"
                  disabled={!editMode}
                >
                  <MenuItem value="Khách thuê">Khách thuê</MenuItem>
                  <MenuItem value="Chủ cho thuê">Chủ cho thuê</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày tạo"
                value={editedUser?.createdAt || ''}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lần đăng nhập cuối"
                value={editedUser?.lastLogin || ''}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {editMode && (
            <>
              <Button onClick={() => setEditMode(false)}>Hủy</Button>
              <Button 
                onClick={handleSaveChanges}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Lưu thay đổi
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}
        >
          Cập nhật thông tin người dùng thành công!
        </Alert>
      )}
    </Box>
  );
}
