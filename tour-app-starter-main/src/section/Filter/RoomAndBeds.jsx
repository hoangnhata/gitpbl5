import {
  Box,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

const RoomAndBeds = () => {
  const [bedroom, setBedroom] = useState("any");
  const [bed, setBed] = useState("any");
  const [bath, setBath] = useState("any");

  const handleChangeBedroom = (event, newBedroom) => {
    if (newBedroom !== null) {
      setBedroom(newBedroom);
    }
  };

  const handleChangeBed = (event, newBed) => {
    if (newBed !== null) {
      setBed(newBed);
    }
  };

  const handleChangeBath = (event, newBath) => {
    if (newBath !== null) {
      setBath(newBath);
    }
  };

  return (
    <Stack spacing={1}>
      <InputLabel
        sx={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Phòng và giường
      </InputLabel>
      <Box sx={{ p: 1 }}>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ fontSize: 13 }}>
            Phòng ngủ
          </Typography>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            size="small"
            value={bedroom}
            exclusive
            onChange={handleChangeBedroom}
          >
            <ToggleButton value="any">Tất cả</ToggleButton>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
            <ToggleButton value="4">4</ToggleButton>
            <ToggleButton value="5">5</ToggleButton>
            <ToggleButton value="6">6+</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box sx={{ p: 1 }}>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ fontSize: 13 }}>
            Giường
          </Typography>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            size="small"
            value={bed}
            exclusive
            onChange={handleChangeBed}
          >
            <ToggleButton value="any">Tất cả</ToggleButton>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
            <ToggleButton value="4">4</ToggleButton>
            <ToggleButton value="5">5</ToggleButton>
            <ToggleButton value="6">6+</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box sx={{ p: 1 }}>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ fontSize: 13 }}>
            Phòng tắm
          </Typography>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            size="small"
            value={bath}
            exclusive
            onChange={handleChangeBath}
          >
            <ToggleButton value="any">Tất cả</ToggleButton>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
            <ToggleButton value="4">4</ToggleButton>
            <ToggleButton value="5">5</ToggleButton>
            <ToggleButton value="6">6+</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RoomAndBeds;
