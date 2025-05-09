import React, { useEffect, useState } from 'react';
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
  Switch
} from '@mui/material';
import '../../App.css';
import '../../index.css';

const mockSystemData = [
  {
    id: 1,
    feature: 'Sao lưu dữ liệu',
    description: 'Tự động sao lưu hệ thống mỗi ngày',
    enabled: true
  },
  {
    id: 4,
    feature: 'Thông báo hệ thống',
    description: 'Gửi thông báo đến toàn bộ người dùng khi có cập nhật',
    enabled: true
  },
  {
    id: 3,
    feature: 'Chế độ bảo trì',
    description: 'Kích hoạt để bảo trì hệ thống',
    enabled: false
  }
];

export default function AdminSystem() {
  const [systemList, setSystemList] = useState([]);

  useEffect(() => {
    setSystemList(mockSystemData);
  }, []);

  const toggleFeature = (id) => {
    setSystemList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'left', fontWeight: 600 }}>
        Quản lý hệ thống
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Chức năng</strong></TableCell>
              <TableCell><strong>Mô tả</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {systemList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.feature}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Typography color={row.enabled ? 'green' : 'red'}>
                    {row.enabled ? 'Đang bật' : 'Đang tắt'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={row.enabled}
                    onChange={() => toggleFeature(row.id)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
