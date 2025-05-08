import React, { useEffect, useRef } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid
} from '@mui/material';
import Chart from 'chart.js/auto';

export default function AdminReports() {
  const revenueRef = useRef(null);
  const usersRef = useRef(null);
  const popularRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    const revenueChart = new Chart(revenueRef.current, {
      type: 'line',
      data: {
        labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6'],
        datasets: [
          {
            label: 'Số tiền giao dịch qua hệ thống',
            data: [120, 190, 300, 500, 200, 300],
            borderColor: '#42a5f5',
            tension: 0.4,
            fill: true
          }
        ]
      }
    });

    const newUsersChart = new Chart(usersRef.current, {
      type: 'bar',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        datasets: [
          {
            label: 'Người dùng mới',
            data: [30, 45, 28, 60, 70, 90],
            backgroundColor: '#66bb6a'
          }
        ]
      }
    });

    const popularChart = new Chart(popularRef.current, {
      type: 'pie',
      data: {
        labels: ['Villa', 'Căn hộ', 'Nhà gỗ'],
        datasets: [
          {
            label: 'Loại chỗ ở phổ biến',
            data: [45, 25, 30],
            backgroundColor: ['#ffa726', '#ab47bc', '#29b6f6']
          }
        ]
      }
    });

    const feedbackChart = new Chart(feedbackRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Tốt', 'Trung bình', 'Kém'],
        datasets: [
          {
            label: 'Đánh giá',
            data: [65, 25, 10],
            backgroundColor: ['#66bb6a', '#ffee58', '#ef5350']
          }
        ]
      }
    });

    return () => {
      revenueChart.destroy();
      newUsersChart.destroy();
      popularChart.destroy();
      feedbackChart.destroy();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Thống kê & Báo cáo
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <canvas ref={revenueRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <canvas ref={usersRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <canvas ref={popularRef}></canvas>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <canvas ref={feedbackRef}></canvas>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
