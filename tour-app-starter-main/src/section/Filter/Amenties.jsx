import { useState } from "react";
import {
  Stack,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
} from "@mui/material";

const Amenities = () => {
  const [amenities, setAmenities] = useState({
    wifi: false,
    kitchen: false,
    washer: false,
    dryer: false,
    parking: false,
    swimmingPool: false,
    gym: false,
    playground: false,
  });

  const handleChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <InputLabel
          sx={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Tiện nghi
        </InputLabel>
      </Stack>
      <Grid container spacing={1.5}>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.wifi}
                onChange={handleChange}
                name="wifi"
              />
            }
            label="Wi-Fi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.kitchen}
                onChange={handleChange}
                name="kitchen"
              />
            }
            label="Nhà bếp"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.washer}
                onChange={handleChange}
                name="washer"
              />
            }
            label="Máy giặt"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.dryer}
                onChange={handleChange}
                name="dryer"
              />
            }
            label="Máy sấy"
          />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.parking}
                onChange={handleChange}
                name="parking"
              />
            }
            label="Bãi đỗ xe"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.swimmingPool}
                onChange={handleChange}
                name="swimmingPool"
              />
            }
            label="Hồ bơi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.gym}
                onChange={handleChange}
                name="gym"
              />
            }
            label="Phòng tập gym"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.playground}
                onChange={handleChange}
                name="playground"
              />
            }
            label="Sân chơi"
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Amenities;
