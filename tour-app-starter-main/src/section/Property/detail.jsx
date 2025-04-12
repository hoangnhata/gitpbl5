import React, { useState } from "react";
import { Box, Card, Typography, Button, CardContent, TextField, Grid, IconButton, Divider, Stack, Popover } from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { DateRangePicker, SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

const Details = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [guest, setGuests] = useState({
    adults: 2,
    children: 1,
    infants: 1,
    pets: 1,
  });
  const [value, setValue] = useState([null, null]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGuestsChange = (type, change) => {
    setGuests((prev) => {
      const newCount = Math.max(0, prev[type] + change);
      return { ...prev, [type]: newCount };
    });
  };

  const displayGuests = `${guest.adults} Adults, ${guest.children} Children, ${guest.infants} Infants, ${guest.pets} Pets`;

  const shortcutItems = [
    { label: "This week", getValue: () => [dayjs().startOf("week"), dayjs().endOf("week")] },
    { label: "Last 7 Days", getValue: () => [dayjs().subtract(7, "days"), dayjs()] },
    { label: "Current Month", getValue: () => [dayjs().startOf("month"), dayjs().endOf("month")] },
    { label: "Next Month", getValue: () => [dayjs().endOf("month").add(1, "day"), dayjs().endOf("month").add(1, "month")] },
    { label: "Reset", getValue: () => [null, null] },
  ];

  return (
    <Box>
      {/* Property Details Section */}
      <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              {/* Property Description (Placeholder) */}
            </Grid>

            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  backgroundColor: "#2d2d2d",
                  color: "white",
                  padding: 3,
                  borderRadius: 2,
                  maxWidth: 400,
                }}
              >
                {/* Price Section */}
                <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                  ₹1,500
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 700 }}>
                  ₹1,350 / Night
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />

                {/* Date Range Picker */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack spacing={2} alignItems="center">
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Select Dates</Typography>
                      <DateRangePicker
                        slots={{ field: SingleInputDateRangeField, textField: TextField }}
                        slotProps={{
                          shortcuts: { items: shortcutItems },
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                            InputProps: { disableUnderline: true },
                          },
                        }}
                        sx={{ width: "100%" }}
                        disablePast
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </Stack>
                  </Grid>
                </Grid>

                <Divider sx={{ marginBottom: 2 }} />

                {/* Guest Info Section (Centered) */}
                <Stack spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary", textAlign: "center" }}>Guest Info</Typography>
                  <Box
                    sx={{
                      display: "inline-block",
                      padding: "10px 15px",
                      backgroundColor: "#333",
                      borderRadius: "25px",
                      cursor: "pointer",
                      marginTop: 2,
                    }}
                    onClick={handleClick}
                  >
                    <Typography variant="body2" sx={{ textAlign: "center" }}>{displayGuests}</Typography>
                  </Box>
                </Stack>

                <Divider sx={{ marginY: 2 }} />

                {/* Reserve Button */}
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#e53935",
                    '&:hover': {
                      backgroundColor: "#c62828",
                    },
                    padding: 1.5,
                  }}
                >
                  Reserve Now
                </Button>

                <Divider sx={{ marginY: 2 }} />

                {/* Pricing Breakdown */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" sx={{ display: "flex", justifyContent: "space-between" }}>
                    ₹1,500 x 3 nights <span>₹4,500</span>
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", justifyContent: "space-between" }}>
                    Service Fee <span>₹572</span>
                  </Typography>
                  <Typography variant="h6" sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                    Total <span>₹4,622</span>
                  </Typography>
                </Box>

                <Divider sx={{ marginY: 2 }} />

                {/* Price Difference Notification */}
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    color: "#e53935",
                    fontWeight: 600,
                  }}
                >
                  Lower price! You save ₹6,121 compared to the average nightly rate.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Popover for Selecting Guests */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} sx={{ px: 4, py: 2 }}>
          {/* Guest Sections */}
          {["adults", "children", "infants", "pets"].map((type) => (
            <React.Fragment key={type}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton color="primary" onClick={() => handleGuestsChange(type, -1)} disabled={guest[type] === 0}>
                    <RemoveCircle />
                  </IconButton>
                  <TextField disabled value={guest[type]} type="number" sx={{ width: 40, textAlign: "center" }} />
                  <IconButton color="primary" onClick={() => handleGuestsChange(type, 1)}>
                    <AddCircle />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}

          {/* Display All Guest Information */}
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {displayGuests}
          </Typography>
        </Stack>
      </Popover>
    </Box>
  );
};

export default Details;
