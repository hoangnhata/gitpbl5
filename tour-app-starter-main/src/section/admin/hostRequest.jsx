import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Avatar,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from "@mui/material";
import axiosInstance from "../../api/axiosConfig";


const mockRequests = [
  {
    id: 1,
    fullname: "Hoàng Minh Nhật",
    avatar: "https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg",
    description: "Tôi là một chủ nhà có kinh nghiệm 5 năm trong lĩnh vực cho thuê phòng trọ. Tôi luôn đảm bảo chất lượng phòng tốt nhất cho khách hàng.",
    languages: "Tiếng Việt, English, Japanese",
    address: "Quỳnh Lưu, Nghệ An",
    experience: "5 năm kinh nghiệm cho thuê phòng trọ",
    status: "PENDING"
  },
  {
    id: 2,
    fullname: "Lê Minh Khánh",
    avatar: "https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg",
    description: "Tôi là một nhà đầu tư bất động sản với nhiều căn hộ cao cấp. Tôi mong muốn mang đến trải nghiệm tốt nhất cho khách hàng.",
    languages: "Tiếng Việt, English, Japanese",
    address: "Quảng Bình",
    experience: "8 năm kinh nghiệm quản lý bất động sản",
    status: "APPROVED"
  },
  {
    id: 3,
    fullname: "Trần Phước Phú",
    avatar: "https://i.pinimg.com/736x/1b/5b/d7/1b5bd7880cacfbc0a775f48e47633003.jpg",
    description: "Tôi là một chủ khách sạn nhỏ với 10 phòng. Tôi có kinh nghiệm trong việc quản lý và chăm sóc khách hàng.",
    languages: "Tiếng Việt, English",
    address: "Vinh Hưng, Huế",
    experience: "10 năm kinh nghiệm quản lý khách sạn",
    status: "REJECTED"
  },
  
];

const HostRequest = () => {
  const theme = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
     
    
      
      
      setRequests(mockRequests);
    } catch (err) {
      setError("Không thể tải danh sách yêu cầu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleApprove = async (requestId) => {
    try {
      setLoading(true);
    
  
      
  
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: "APPROVED" }
            : request
        )
      );
      
      setSuccess("Đã duyệt yêu cầu thành công");
      handleCloseDialog();
    } catch (err) {
      setError("Không thể duyệt yêu cầu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    try {
      setLoading(true);
      
   
      
      
      setRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: "REJECTED" }
            : request
        )
      );
      
      setSuccess("Đã từ chối yêu cầu");
      handleCloseDialog();
    } catch (err) {
      setError("Không thể từ chối yêu cầu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      PENDING: { color: "warning", label: "Chờ duyệt" },
      APPROVED: { color: "success", label: "Đã duyệt" },
      REJECTED: { color: "error", label: "Đã từ chối" },
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <Chip
        label={config.label}
        color={config.color}
        sx={{ fontWeight: 600 }}
      />
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ mb: 5, fontWeight: 700 }}>
          Quản lý yêu cầu lên host
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <Card sx={{ p: 3 }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.shadows[1]
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Ảnh đại diện</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Họ và tên</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Địa chỉ</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ngôn ngữ</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">
                        Chưa có yêu cầu nào
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  requests.map((request) => (
                    <TableRow
                      key={request.id}
                      sx={{
                        '&:hover': { 
                          bgcolor: theme.palette.action.hover 
                        },
                      }}
                    >
                      <TableCell>
                        <Avatar
                          src={request.avatar || "/default-avatar.png"}
                          alt={request.fullname}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>{request.fullname}</TableCell>
                      <TableCell>{request.address}</TableCell>
                      <TableCell>{request.languages}</TableCell>
                      <TableCell>{getStatusChip(request.status)}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewDetails(request)}
                            disabled={request.status !== "PENDING"}
                          >
                            Xem chi tiết
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: theme.palette.background.paper,
            }
          }}
        >
          {selectedRequest && (
            <>
              <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Chi tiết yêu cầu lên host
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      src={selectedRequest.avatar || "/default-avatar.png"}
                      alt={selectedRequest.fullname}
                      sx={{ width: 120, height: 120 }}
                    />
                  </Box>

                  <TextField
                    label="Họ và tên"
                    value={selectedRequest.fullname}
                    fullWidth
                    disabled
                  />

                  <TextField
                    label="Mô tả bản thân / Đội nhóm"
                    value={selectedRequest.description}
                    fullWidth
                    multiline
                    rows={4}
                    disabled
                  />

                  <TextField
                    label="Ngôn ngữ sử dụng"
                    value={selectedRequest.languages}
                    fullWidth
                    disabled
                  />

                  <TextField
                    label="Địa chỉ"
                    value={selectedRequest.address}
                    fullWidth
                    disabled
                  />

                  <TextField
                    label="Kinh nghiệm"
                    value={selectedRequest.experience}
                    fullWidth
                    disabled
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                <Button
                  onClick={handleCloseDialog}
                  color="inherit"
                  variant="outlined"
                >
                  Đóng
                </Button>
                {selectedRequest.status === "PENDING" && (
                  <>
                    <Button
                      onClick={() => handleReject(selectedRequest.id)}
                      color="error"
                      variant="contained"
                      disabled={loading}
                    >
                      Từ chối
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      color="success"
                      variant="contained"
                      disabled={loading}
                    >
                      Duyệt
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default HostRequest;
