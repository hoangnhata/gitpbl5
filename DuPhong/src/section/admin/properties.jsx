import React, { useState, useEffect } from 'react';
import {
  Container,
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
  Paper
} from '@mui/material';

const mockProperties = [
  {
    id: 1,
    name: 'Villa Nha Trang',
    location: 'Nha Trang',
    price: '2,000,000 VND',
    owner: 'Chủ A',
    image: ''
  },
  {
    id: 2,
    name: 'Căn hộ Đà Nẵng',
    location: 'Đà Nẵng',
    price: '1,200,000 VND',
    owner: 'Chủ B',
    image: 'https://source.unsplash.com/featured/?apartment,city'
  },
  {
    id: 3,
    name: 'Nhà gỗ Sapa',
    location: 'Sapa',
    price: '1,500,000 VND',
    owner: 'Chủ A',
    image: 'https://source.unsplash.com/featured/?cabin,mountain'
  }
];


export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');

  useEffect(() => {
    setProperties(mockProperties);
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleOwnerChange = (e) => setOwnerFilter(e.target.value);

  const filteredData = properties.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)) &&
      (ownerFilter === 'all' || item.owner.toLowerCase().includes(ownerFilter.toLowerCase()))
  );

  const handleApprove = (id) => alert(`✅ Đã duyệt chỗ ở có ID: ${id}`);
  const handleRemove = (id) => alert(`⚠️ Đã gỡ chỗ ở có ID: ${id}`);
  const handlePromo = (id) => alert(`💡 Đã áp dụng khuyến mãi cho ID: ${id}`);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: 'left', fontWeight: 600 }}>
        QUẢN LÝ CHỖ Ở
      </Typography>

      <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mb={3}>
        <TextField label="Tìm kiếm chỗ ở..." variant="outlined" onChange={handleSearchChange} />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Chủ sở hữu</InputLabel>
          <Select value={ownerFilter} label="Chủ sở hữu" onChange={handleOwnerChange}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="Chủ A">Chủ A</MenuItem>
            <MenuItem value="Chủ B">Chủ B</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper elevation={3}>
        <Table>
        <TableHead>
  <TableRow>
    {['Ảnh', 'Tên chỗ ở', 'Địa điểm', 'Giá', 'Chủ sở hữu', 'Hành động'].map((header) => (
      <TableCell
        key={header}
        sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
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
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
        />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.owner}</TableCell>
      <TableCell>
        <Box display="flex" gap={1}>
          <Button variant="contained" color="success" onClick={() => handleApprove(item.id)}>Duyệt</Button>
          <Button variant="contained" color="error" onClick={() => handleRemove(item.id)}>Gỡ</Button>
          <Button variant="contained" color="info" onClick={() => handlePromo(item.id)}>KM</Button>
        </Box>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </Paper>
    </Container>
  );
}
