import { InputLabel, Slider, Stack, TextField } from "@mui/material";
import { useState } from "react";

const PriceRange = () => {
  const [value, setValue] = useState([20, 75]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={1}>
      <InputLabel
        sx={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Khoảng giá
      </InputLabel>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}$`}
        min={0}
        max={100}
        step={1}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          size="small"
          label="Tối thiểu"
          type="number"
          value={value[0]}
          onChange={(e) => {
            setValue((prev) => {
              return [e.target.value, prev[1]];
            });
          }}
        />
        <TextField
          size="small"
          label="Tối đa"
          type="number"
          value={value[1]}
          onChange={(e) => {
            setValue((prev) => {
              return [prev[0], e.target.value];
            });
          }}
        />
      </Stack>
    </Stack>
  );
};

export default PriceRange;
