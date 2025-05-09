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
  Button
} from '@mui/material';
import '../../App.css';
import '../../index.css';

const mockSupportData = [
  {
    id: 1,
    category: 'Kỹ thuật',
    description: 'Lỗi không thể đăng nhập tài khoản',
    status: 'Đang xử lý'
  },
  {
    id: 2,
    category: 'Thanh toán',
    description: 'Giao dịch không thành công nhưng bị trừ tiền',
    status: 'Đã giải quyết'
  },
  {
    id: 3,
    category: 'Tài khoản',
    description: 'Yêu cầu cập nhật email',
    status: 'Chưa phản hồi'
  },
  {
    id: 4,
    category: 'Tài khoản',
    description: 'Yêu cầu cập nhật email',
    status: 'Chưa phản hồi'
  },
  {
    id: 5,
    category: 'Tài khoản',
    description: 'Yêu cầu cập nhật email',
    status: 'Chưa phản hồi'
  },
  {
    id: 6,
    category: 'Tài khoản',
    description: 'Yêu cầu cập nhật email',
    status: 'Chưa phản hồi'
  }

];

export default function AdminSupport() {
  const [supportList, setSupportList] = useState([]);

  useEffect(() => {
    setSupportList(mockSupportData);
  }, []);

  const handleAction = (id) => {
    alert(`Đã xử lý yêu cầu có ID: ${id}`);

  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'left', fontWeight: 600 }}>
        Hỗ trợ người dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Hạng mục</strong></TableCell>
              <TableCell><strong>Mô tả</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supportList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(row.id)}
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
