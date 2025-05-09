import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Chip,
  Stack,
  Badge,
  InputAdornment,
  Drawer,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  Person as PersonIcon,
  Store as StoreIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';

const mockConversations = [
  {
    id: 1,
    type: 'user',
    name: 'Lê Minh Khánh',
    avatar: 'A',
    lastMessage: 'Tôi cần hỗ trợ về vấn đề thanh toán',
    time: '10:30',
    unread: 2,
    status: 'online',
    rating: 4.5
  },
  {
    id: 2,
    type: 'seller',
    name: 'Hoàng Minh Nhật',
    avatar: 'V',
    lastMessage: 'Xin chào, tôi muốn đăng ký làm đối tác',
    time: '09:15',
    unread: 0,
    status: 'offline',
    rating: 4.8
  },
  {
    id: 3,
    type: 'user',
    name: 'Trần Phước Phú',
    avatar: 'B',
    lastMessage: 'Cảm ơn admin đã hỗ trợ',
    time: 'Hôm qua',
    unread: 0,
    status: 'online',
    rating: 5.0
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      sender: 'user',
      content: 'Xin chào, tôi cần hỗ trợ về vấn đề thanh toán',
      time: '10:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'admin',
      content: 'Chào bạn, bạn có thể cho tôi biết chi tiết vấn đề không?',
      time: '10:31',
      status: 'read'
    },
    {
      id: 3,
      sender: 'user',
      content: 'Tôi đã thanh toán nhưng hệ thống báo lỗi',
      time: '10:32',
      status: 'unread'
    }
  ]
};

export default function AdminMessages() {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setConversations(mockConversations);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === 0 ? true : 
                       (activeTab === 1 ? conv.type === 'user' : conv.type === 'seller');
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Tin nhắn
      </Typography>

      <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>


        <Grid item xs={12} md={4} lg={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: theme.palette.background.paper
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm cuộc trò chuyện..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowFilters(!showFilters)}>
                        <FilterIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Tất cả" />
              <Tab label="Người dùng" />
              <Tab label="Đối tác" />
            </Tabs>

            <List sx={{ flex: 1, overflow: 'auto' }}>
              {filteredConversations.map((conv) => (
                <ListItem
                  key={conv.id}
                  button
                  selected={selectedChat?.id === conv.id}
                  onClick={() => setSelectedChat(conv)}
                  sx={{
                    borderLeft: selectedChat?.id === conv.id ? 3 : 0,
                    borderColor: 'primary.main',
                    bgcolor: selectedChat?.id === conv.id ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                      bgcolor: theme.palette.action.hover
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={conv.status === 'online' ? 'success' : 'default'}
                    >
                      <Avatar sx={{ bgcolor: conv.type === 'user' ? 'primary.main' : 'secondary.main' }}>
                        {conv.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" color="text.primary">
                          {conv.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conv.time}
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '200px'
                          }}
                        >
                          {conv.lastMessage}
                        </Typography>
                        {conv.unread > 0 && (
                          <Chip
                            label={conv.unread}
                            size="small"
                            color="primary"
                            sx={{ minWidth: '20px', height: '20px' }}
                          />
                        )}
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>


        <Grid item xs={12} md={8} lg={9}>
          {selectedChat ? (
            <Paper 
              elevation={3} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: theme.palette.background.paper
              }}
            >


              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: theme.palette.background.default }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: selectedChat.type === 'user' ? 'primary.main' : 'secondary.main' }}>
                    {selectedChat.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h6" color="text.primary">
                        {selectedChat.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={selectedChat.type === 'user' ? 'Người dùng' : 'Đối tác'}
                        color={selectedChat.type === 'user' ? 'primary' : 'secondary'}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        {selectedChat.status === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" color="text.secondary">
                          {selectedChat.rating}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>


              <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: theme.palette.grey[50] }}>
                {mockMessages[selectedChat.id]?.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: msg.sender === 'admin' ? 'primary.main' : theme.palette.background.paper,
                        color: msg.sender === 'admin' ? 'primary.contrastText' : theme.palette.text.primary,
                        '&:hover': {
                          boxShadow: 2
                        }
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: msg.sender === 'admin' ? 'primary.contrastText' : theme.palette.text.secondary,
                          opacity: 0.7 
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>


              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: theme.palette.background.default }}>
                <Stack direction="row" spacing={1}>
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton>
                    <ImageIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    placeholder="Nhập tin nhắn..."
                    variant="outlined"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: theme.palette.background.paper
                      }
                    }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          ) : (
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.grey[50]
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Typography variant="h6" color="text.secondary">
                  Chọn một cuộc trò chuyện để bắt đầu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hoặc tìm kiếm người dùng/đối tác để nhắn tin
                </Typography>
              </Stack>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <Box sx={{ width: 300, p: 3, bgcolor: theme.palette.background.paper }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" color="text.primary">Bộ lọc</Typography>
            <IconButton onClick={() => setShowFilters(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack spacing={3}>
            <TextField
              label="Tìm kiếm"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.background.paper
                }
              }}
            />
            <TextField
              select
              label="Trạng thái"
              variant="outlined"
              size="small"
              fullWidth
              SelectProps={{
                native: true
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.background.paper
                }
              }}
            >
              <option value="all">Tất cả</option>
              <option value="online">Đang hoạt động</option>
              <option value="offline">Ngoại tuyến</option>
            </TextField>
            <TextField
              select
              label="Đánh giá"
              variant="outlined"
              size="small"
              fullWidth
              SelectProps={{
                native: true
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: theme.palette.background.paper
                }
              }}
            >
              <option value="all">Tất cả</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao trở lên</option>
              <option value="3">3 sao trở lên</option>
            </TextField>
            <Button variant="contained" fullWidth>
              Áp dụng
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
