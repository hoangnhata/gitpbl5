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
  TextField,
  Select,
  MenuItem,
  Box,
  Button
} from '@mui/material';
import '../../App.css';
import '../../index.css';

const mockTransactions = [
  {
    id: 'TXN001',
    type: 'Đặt phòng',
    customer: 'NNNNN',
    date: '2025-05-01',
    amount: 1200000
  },
  {
    id: 'TXN002',
    type: 'Hủy phòng',
    customer: 'KKKK',
    date: '2025-05-02',
    amount: -500000
  },
  {
    id: 'TXN003',
    type: 'Hoàn tiền',
    customer: 'PPPPP',
    date: '2025-05-03',
    amount: -700000
  }
];

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  const filteredData = transactions.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || txn.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'left', fontWeight: 600 }}>
        Giám sát giao dịch
      </Typography>
      <Box display="flex" gap={2} mb={3} justifyContent="center" flexWrap="wrap">
        <TextField
          label="Tìm kiếm giao dịch..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">Tất cả loại</MenuItem>
          <MenuItem value="Đặt phòng">Đặt phòng</MenuItem>
          <MenuItem value="Hủy phòng">Hủy phòng</MenuItem>
          <MenuItem value="Hoàn tiền">Hoàn tiền</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Mã giao dịch</strong></TableCell>
              <TableCell><strong>Loại</strong></TableCell>
              <TableCell><strong>Khách hàng</strong></TableCell>
              <TableCell><strong>Ngày</strong></TableCell>
              <TableCell><strong>Số tiền</strong></TableCell>
              <TableCell><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.id}</TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>{txn.customer}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.amount.toLocaleString('vi-VN')}₫</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => alert(`Chi tiết giao dịch: ${txn.id}`)}>
                    Xem
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => alert(`Chi tiết giao dịch: ${txn.id}`)}>
                    Duyệt
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => alert(`Chi tiết giao dịch: ${txn.id}`)}>
                    Hoàn tiền
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
