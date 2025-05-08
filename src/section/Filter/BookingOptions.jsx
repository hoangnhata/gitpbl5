import { Stack, InputLabel, Typography, Switch } from "@mui/material";

const BookingOptions = () => {
  return (
    <Stack spacing={1}>
      <InputLabel
        sx={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Booking Options
      </InputLabel>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" sx={{ fontSize: 13 }}>
          Instant book
        </Typography>
        <Switch defaultChecked />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" sx={{ fontSize: 13 }}>
          Self Check-in 
        </Typography>
        <Switch defaultChecked />
      </Stack>
    </Stack>
  );
};
export default BookingOptions;
