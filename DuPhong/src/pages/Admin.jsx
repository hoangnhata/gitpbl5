import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Container,
  Paper,
  Stack,
  IconButton,
  Badge,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

// Import admin section components
import AdminDashboard from "../section/admin/dashboard";
import AdminUsers from "../section/admin/users";
import AdminProperties from "../section/admin/properties";
import AdminTransactions from "../section/admin/transactions";
import AdminReports from "../section/admin/reports";
import AdminSupports from "../section/admin/supports";
import AdminSystem from "../section/admin/system";

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AdminPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 3, py: 4 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "background.default" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Trang Quản Trị
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Theo dõi & quản lý toàn bộ hệ thống
            </Typography>
          </Box>
          <IconButton>
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Paper>

      {/* Tabs Navigation */}
      <Paper elevation={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="admin-tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Tổng quan" />
          <Tab label="Người dùng" />
          <Tab label="Chỗ ở" />
          <Tab label="Giao dịch" />
          <Tab label="Báo cáo" />
          <Tab label="Hỗ trợ" />
          <Tab label="Hệ thống" />
        </Tabs>
      </Paper>

      {/* Tabs Content */}
      <TabPanel value={tabValue} index={0}>
        <AdminDashboard />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AdminUsers />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AdminProperties />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <AdminTransactions />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <AdminReports />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <AdminSupports />
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        <AdminSystem />
      </TabPanel>
    </Container>
  );
}
