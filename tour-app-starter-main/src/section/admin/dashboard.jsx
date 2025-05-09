import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Reply as ReplyIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import Chart from 'chart.js/auto';

const dataSummary = [
  { 
    label: 'Tổng người dùng', 
    value: 3,
    change: '+12.5%',
    icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    color: 'primary.main'
  },
  { 
    label: 'Tổng giao dịch', 
    value: 3,
    change: '+8.2%',
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    color: 'success.main'
  },
  { 
    label: 'Chỗ ở đã duyệt', 
    value: 3,
    change: '+15.3%',
    icon: <HomeIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    color: 'warning.main'
  },
  { 
    label: 'Báo cáo xử lý', 
    value: 3,
    change: '-5.2%',
    icon: <WarningIcon sx={{ fontSize: 40, color: 'error.main' }} />,
    color: 'error.main'
  }
];

const recentActions = [
  {
    id: 1,
    type: 'approve',
    message: 'Duyệt chỗ ở id100 - 110 Ngô Quyền, Đà Nẵng',
    time: '5 phút trước',
    user: 'Admin A'
  },
  {
    id: 2,
    type: 'warning',
    message: 'Cảnh báo người dùng #22',
    time: '15 phút trước',
    user: 'Admin B'
  },
  {
    id: 3,
    type: 'reply',
    message: 'Phản hồi hỗ trợ #88',
    time: '30 phút trước',
    user: 'Admin C'
  },
  {
    id: 4,
    type: 'approve',
    message: 'Duyệt chỗ ở id101 - 120 Lê Duẩn, Hà Nội',
    time: '1 giờ trước',
    user: 'Admin A'
  },
  {
    id: 5,
    type: 'warning',
    message: 'Cảnh báo người dùng #23',
    time: '2 giờ trước',
    user: 'Admin B'
  }
];

const getActionIcon = (type) => {
  switch (type) {
    case 'approve':
      return <CheckCircleIcon sx={{ color: 'success.main' }} />;
    case 'warning':
      return <WarningIcon sx={{ color: 'warning.main' }} />;
    case 'reply':
      return <ReplyIcon sx={{ color: 'info.main' }} />;
    default:
      return <NotificationsIcon />;
  }
};

export default function AdminDashboard() {
  const summaryChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

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
    if (!summaryChartRef.current || !categoryChartRef.current) return;

    const summaryChart = createChart(summaryChartRef.current, 'bar', {
      labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
      datasets: [
        {
          label: 'Doanh thu (triệu VND)',
          data: [120, 190, 300, 500, 200, 300],
          backgroundColor: '#42a5f5',
          borderRadius: 5
        },
        {
          label: 'Người dùng mới',
          data: [30, 45, 28, 60, 70, 90],
          backgroundColor: '#66bb6a',
          borderRadius: 5
        }
      ]
    }, {
      plugins: {
        legend: { 
          position: 'top',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        title: { 
          display: true, 
          text: 'Tổng hợp Giao dịch & Người dùng mới',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    });

    const categoryChart = createChart(categoryChartRef.current, 'bar', {
      labels: ['Villa', 'Căn hộ', 'Nhà gỗ', 'Tốt', 'Trung bình', 'Kém'],
      datasets: [
        {
          label: 'Số lượng',
          data: [45, 25, 30, 65, 25, 10],
          backgroundColor: [
            '#ffa726', '#ab47bc', '#29b6f6',
            '#66bb6a', '#ffee58', '#ef5350'
          ],
          borderRadius: 5
        }
      ]
    }, {
      plugins: {
        legend: { display: false },
        title: { 
          display: true, 
          text: 'Phân loại chỗ ở & đánh giá',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 10 },
          grid: {
            drawBorder: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    });

    return () => {
      if (summaryChart) summaryChart.destroy();
      if (categoryChart) categoryChart.destroy();
    };
  };

  useEffect(() => {
    const checkCanvasReady = () => {
      if (summaryChartRef.current && categoryChartRef.current) {
        setIsCanvasReady(true);
      }
    };

    checkCanvasReady();
    const timer = setTimeout(checkCanvasReady, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCanvasReady) {
      return initializeCharts();
    }
  }, [isCanvasReady]);

  return (
    <Box sx={{ height: '100%', width: '100%', p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          BẢNG ĐIỀU KHIỂN ADMIN
        </Typography>
        <Tooltip title="Làm mới">
          <IconButton onClick={() => isCanvasReady && initializeCharts()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dataSummary.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {item.label}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                      {item.value}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {item.change.startsWith('+') ? (
                        <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16 }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 16 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{ 
                          color: item.change.startsWith('+') ? 'success.main' : 'error.main'
                        }}
                      >
                        {item.change}
                      </Typography>
                    </Stack>
                  </Box>
                  {item.icon}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={summaryChartRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: 400 }}>
            <canvas ref={categoryChartRef}></canvas>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Hoạt động gần đây
          </Typography>
          <Chip 
            label="Xem tất cả" 
            color="primary" 
            variant="outlined"
            clickable
          />
        </Stack>
        <List>
          {recentActions.map((action, index) => (
            <React.Fragment key={action.id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {action.time}
                    </Typography>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {action.user.charAt(0)}
                    </Avatar>
                  </Stack>
                }
              >
                <ListItemIcon>
                  {getActionIcon(action.type)}
                </ListItemIcon>
                <ListItemText 
                  primary={action.message}
                  secondary={action.user}
                />
              </ListItem>
              {index < recentActions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
