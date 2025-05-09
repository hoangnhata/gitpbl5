import React, { useState, useEffect } from 'react';
import {
  Container,
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
  Box
} from '@mui/material';
import '../../App.css';
import '../../index.css';

const mockUsers = [
  {
    id: 1,
    name: 'Hoàng Minh Nhật',
    email: 'nhat@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },
  {
    id: 2,
    name: 'Lê Minh Khánh',
    email: 'khanh@gmail.com',
    role: 'Chủ cho thuê',
    status: 'Bị khóa'
  },
  {
    id: 3,
    name: 'Trần Phước Phú',
    email: 'c@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },

  {
    id: 1,
    name: 'Hoàng Minh Nhật',
    email: 'nhat@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },
  {
    id: 2,
    name: 'Lê Minh Khánh',
    email: 'khanh@gmail.com',
    role: 'Chủ cho thuê',
    status: 'Bị khóa'
  },
  {
    id: 3,
    name: 'Trần Phước Phú',
    email: 'c@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },
  {
    id: 1,
    name: 'Hoàng Minh Nhật',
    email: 'nhat@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },
  {
    id: 2,
    name: 'Lê Minh Khánh',
    email: 'khanh@gmail.com',
    role: 'Chủ cho thuê',
    status: 'Bị khóa'
  },
  {
    id: 3,
    name: 'Trần Phước Phú',
    email: 'c@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },

  {
    id: 1,
    name: 'Hoàng Minh Nhật',
    email: 'nhat@gmail.com',
    role: 'Khách thuê',
    status: 'Hoạt động'
  },
  {
    id: 2,
    name: 'Lê Minh Khánh',
    email: 'khanh@gmail.com',
    role: 'Chủ cho thuê',
    status: 'Bị khóa'
  }
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const handleAction = (id) => {
    alert(`Đã xử lý tài khoản có ID: ${id}`);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'left', fontWeight: 600 }}>
        Quản lý người dùng
      </Typography>
      <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center">
        <TextField
          label="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="Khách thuê">Khách thuê</MenuItem>
          <MenuItem value="Chủ cho thuê">Chủ cho thuê</MenuItem>
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <MenuItem value="all">Trạng thái</MenuItem>
          <MenuItem value="Hoạt động">Hoạt động</MenuItem>
          <MenuItem value="Bị khóa">Bị khóa</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(user.id)}
                  >
                    Xử lý
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
