import { useEffect, useState } from "react";
import {
  Stack,
  Checkbox,
  Grid,
  InputLabel,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const Amenities = ({ value = [], onChange, showIcon }) => {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selected, setSelected] = useState(value || []);

  // Lấy danh sách amenities từ API khi mount
  useEffect(() => {
    const fetchAmenities = async () => {
      const res = await axios.get("http://localhost:8080/api/amenities");
      setAmenitiesList(res.data.result);
    };
    fetchAmenities();
  }, []);

  // Khi value từ props thay đổi (ví dụ reset filter), cập nhật lại selected
  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  // Xử lý khi chọn/bỏ chọn
  const handleChange = (name) => {
    let newSelected;
    if (selected.includes(name)) {
      newSelected = selected.filter((item) => item !== name);
    } else {
      newSelected = [...selected, name];
    }
    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <InputLabel sx={{ fontSize: 14, fontWeight: 600 }}>
          Tiện nghi
        </InputLabel>
      </Stack>
      <Grid container spacing={1}>
        {amenitiesList.map((amenity) => (
          <Grid item xs={12} key={amenity.id}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              p={1}
              borderRadius={2}
            >
              {showIcon && amenity.thumnailUrl && (
                <Avatar
                  src={`http://localhost:8080${amenity.thumnailUrl}`}
                  alt={amenity.name}
                  sx={{ width: 25, height: 25, bgcolor: "#fff" }}
                  variant="rounded"
                />
              )}
              <Typography
                flex={1}
                variant="body2"
                sx={{ fontWeight: 400, color: "text.primary" }}
              >
                {amenity.name}
              </Typography>
              <Checkbox
                checked={selected.includes(amenity.name)}
                onChange={() => handleChange(amenity.name)}
                color="primary"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Amenities;
