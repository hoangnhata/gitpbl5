import React, { useEffect, useRef } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Stack,
} from '@mui/material';
import Chart from 'chart.js/auto';

const dataSummary = [
  { label: 'Tổng người dùng', value: 1324 },
  { label: 'Tổng giao dịch', value: 895 },
  { label: 'Chỗ ở đã duyệt', value: 420 },
  { label: 'Báo cáo xử lý', value: 38 }
];

const recentActions = [
  'Duyệt chỗ ở id100 - 110 Ngô Quyền, Đà Nẵng',
  'Cảnh báo người dùng #22',
  'Phần hồi hỗ trợ #88',
  'Duyệt chỗ ở id100 - 110 Ngô Quyền, Đà Nẵng',
  'Cảnh báo người dùng #22',
];

export default function AdminDashboard() {
  const summaryChartRef = useRef(null);
  const categoryChartRef = useRef(null);

  useEffect(() => {
    const summaryChart = new Chart(summaryChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
        datasets: [
          {
            label: 'Doanh thu (triệu VND)',
            data: [120, 190, 300, 500, 200, 300],
            backgroundColor: '#42a5f5'
          },
          {
            label: 'Người dùng mới',
            data: [30, 45, 28, 60, 70, 90],
            backgroundColor: '#66bb6a'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Tổng hợp Giao dịch & Người dùng mới' }
        }
      }
    });

    const categoryChart = new Chart(categoryChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Villa', 'Căn hộ', 'Nhà gỗ', 'Tốt', 'Trung bình', 'Kém'],
        datasets: [
          {
            label: 'Số lượng',
            data: [45, 25, 30, 65, 25, 10],
            backgroundColor: [
              '#ffa726', '#ab47bc', '#29b6f6',
              '#66bb6a', '#ffee58', '#ef5350'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Phân loại chỗ ở & đánh giá' }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 10 }
          }
        }
      }
    });

    return () => {
      summaryChart.destroy();
      categoryChart.destroy();
    };
  }, []);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={600}>
          BẢNG ĐIỀU KHIỂN ADMIN
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {dataSummary.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', width: '100%' }}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Biểu đồ tổng hợp
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100%' }}>
              <canvas ref={summaryChartRef}></canvas>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100%' }}>
              <canvas ref={categoryChartRef}></canvas>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Hoạt động gần đây
        </Typography>
        <Paper elevation={2} sx={{ p: 2, width: '100%' }}>
          <Stack spacing={1}>
            {recentActions.map((action, index) => (
              <Typography key={index} variant="body1">
                {action}
              </Typography>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
