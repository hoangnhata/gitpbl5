import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import Chart from 'chart.js/auto';
import axiosInstance from '../../api/axiosConfig';

export default function AdminReports() {
  const revenueRef = useRef(null);
  const usersRef = useRef(null);
  const popularRef = useRef(null);
  const feedbackRef = useRef(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [charts, setCharts] = useState({
    revenue: null,
    users: null,
    popular: null,
    feedback: null
  });
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [ratingStats, setRatingStats] = useState([]);
  const [loadingRating, setLoadingRating] = useState(false);
  const [errorRating, setErrorRating] = useState(null);

  const statsData = [
    {
      title: 'Tổng doanh thu',
      value: '₫15',
      change: '+12.5%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main'
    },
    {
      title: 'Người dùng mới',
      value: '3',
      change: '+8.2%',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main'
    },
    {
      title: 'Chỗ ở mới',
      value: '3',
      change: '+15.3%',
      icon: <HomeIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.main'
    },
    {
      title: 'Đánh giá trung bình',
      value: '4.5',
      change: '+0.3',
      icon: <StarIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info.main'
    }
  ];

  const recentTransactions = [
    { id: 1, user: 'Lê Minh Khánh', amount: '₫4', type: 'Đặt phòng', date: '2025-03-20', status: 'Hoàn thành' },
    { id: 2, user: 'Hoàng Minh Nhật', amount: '₫5', type: 'Hủy phòng', date: '2025-03-19', status: 'Đã hoàn tiền' },
    { id: 3, user: 'Trần Phước Phú', amount: '₫6', type: 'Đặt phòng', date: '2025-03-18', status: 'Hoàn thành' }
  ];

  const createChart = (ctx, type, data, options) => {
    if (!ctx) return null;
    try {
      return new Chart(ctx, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...options
        }
      });
    } catch (error) {
      console.error('Error creating chart:', error);
      return null;
    }
  };

  const initializeCharts = () => {
    if (!revenueRef.current || !usersRef.current || !popularRef.current || !feedbackRef.current) {
      console.log('Canvas elements not ready yet');
      return;
    }
    Object.values(charts).forEach(chart => {
      if (chart) {
        try {
          chart.destroy();
        } catch (error) {
          console.error('Error destroying chart:', error);
        }
      }
    });
    try {
      const fetchRatingStats = async () => {
        setLoadingRating(true);
        setErrorRating(null);
        try {
          const res = await axiosInstance.get('/api/statistic/rating');
          setRatingStats(res.data.result || []);
        } catch (err) {
          setErrorRating('Không thể tải dữ liệu đánh giá');
        } finally {
          setLoadingRating(false);
        }
      };
      fetchRatingStats();

      const ratingColor = (rating) => {
        switch (rating) {
          case 5: return '#4caf50';
          case 4: return '#8bc34a';
          case 3: return '#ffeb3b';
          case 2: return '#ff9800';
          case 1: return '#f44336';
          default: return '#bdbdbd';
        }
      };

      const feedbackLabels = ratingStats.map(item => `${item.rating} sao`);
      const feedbackData = ratingStats.map(item => item.persentage);
      const feedbackColors = ratingStats.map(item => ratingColor(item.rating));
      const newCharts = {
        revenue: createChart(revenueRef.current, 'line', {
          labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
          datasets: [{
            label: 'Doanh thu',
            data: [6, 2, 3, 1, 5, 4],
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66, 165, 245, 0.1)',
            tension: 0.4,
            fill: true
          }]
        }, {
          plugins: {
            title: {
              display: true,
              text: 'Doanh thu theo ngày',
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => `₫${value}K`
              }
            }
          }
        }),

        users: createChart(usersRef.current, 'bar', {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
          datasets: [{
            label: 'Người dùng mới',
            data: [6, 2, 3, 1, 5, 4],
            backgroundColor: '#66bb6a'
          }]
        }, {
          plugins: {
            title: {
              display: true,
              text: 'Người dùng mới theo tháng',
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }),

        popular: createChart(popularRef.current, 'pie', {
          labels: ['Villa', 'Căn hộ', 'Nhà gỗ'],
          datasets: [{
            data: [1, 2, 3],
            backgroundColor: ['#ffa726', '#ab47bc', '#29b6f6']
          }]
        }, {
          plugins: {
            title: {
              display: true,
              text: 'Phân bố loại chỗ ở',
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              position: 'bottom'
            }
          }
        }),

        feedback: createChart(feedbackRef.current, 'doughnut', {
          labels: feedbackLabels,
          datasets: [{
            data: feedbackData,
            backgroundColor: feedbackColors
          }]
        }, {
          plugins: {
            title: {
              display: true,
              text: 'Phân bố đánh giá',
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              position: 'bottom'
            }
          }
        })
      };

      setCharts(newCharts);
    } catch (error) {
      console.error('Error initializing charts:', error);
    }
  };

  useEffect(() => {
    const checkCanvasReady = () => {
      if (revenueRef.current && usersRef.current && popularRef.current && feedbackRef.current) {
        setIsCanvasReady(true);
      }
    };

    checkCanvasReady();

    const timer = setTimeout(checkCanvasReady, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCanvasReady) {
      initializeCharts();
    }

    return () => {
      Object.values(charts).forEach(chart => {
        if (chart) {
          try {
            chart.destroy();
          } catch (error) {
            console.error('Error destroying chart:', error);
          }
        }
      });
    };
  }, [isCanvasReady, timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleRefresh = () => {
    if (isCanvasReady) {
      initializeCharts();
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Thống kê & Báo cáo
        </Typography>
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Thời gian</InputLabel>
            <Select
              value={timeRange}
              label="Thời gian"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="7days">7 ngày qua</MenuItem>
              <MenuItem value="30days">30 ngày qua</MenuItem>
              <MenuItem value="3months">3 tháng qua</MenuItem>
              <MenuItem value="6months">6 tháng qua</MenuItem>
              <MenuItem value="1year">1 năm qua</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Làm mới">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tải xuống báo cáo">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: stat.color }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={revenueRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={usersRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={popularRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={feedbackRef}></canvas>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Giao dịch gần đây
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Người dùng</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.status}
                      color={
                        transaction.status === 'Hoàn thành' ? 'success' :
                        transaction.status === 'Đã hoàn tiền' ? 'warning' : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
