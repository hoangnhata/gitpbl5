import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

const TypeOfPlace = () => {
  return (
    <Stack spacing={1}>
      <InputLabel
        sx={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Loại chỗ ở
      </InputLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        defaultValue="any-type"
        name="row-radio-buttons-group"
        row
      >
        <FormControlLabel
          value="any-type"
          control={<Radio />}
          label={
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 13, fontWeight: 500 }}
            >
              Tất cả các loại
            </Typography>
          }
        />
        <FormControlLabel
          value="room"
          control={<Radio />}
          label={
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 13, fontWeight: 500 }}
            >
              Phòng
            </Typography>
          }
        />
        <FormControlLabel
          value="entire-home"
          control={<Radio />}
          label={
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 13, fontWeight: 500 }}
            >
              Toàn bộ nhà
            </Typography>
          }
        />
      </RadioGroup>
    </Stack>
  );
};

export default TypeOfPlace;
