import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import DateRangeSelector from "./DateRangeSelector";
import GuestSelector from "./GuestSelector";
import PricingBreakdown from "./PricingBreakdown";
import PropTypes from "prop-types";

const BookingCard = ({ price, startDate, endDate }) => {
  const [value, setValue] = useState([null, null]);

  return (
    <Box
      sx={{
        backgroundColor: "#2d2d2d",
        color: "white",
        padding: 3,
        borderRadius: 2,
        maxWidth: 400,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textDecoration: "line-through",
          color: "text.secondary",
        }}
      >
        ₹1,500
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 700 }}>
        ₹{price} / Night
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Date Range Picker */}
      <DateRangeSelector
        value={value}
        setValue={setValue}
        startDate={startDate}
        endDate={endDate}
      />

      <Divider sx={{ marginBottom: 2 }} />

      {/* Guest Info Section */}
      <GuestSelector />

      <Divider sx={{ marginY: 2 }} />

      {/* Reserve Button */}
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{
          marginTop: 2,
          backgroundColor: "#e53935",
          "&:hover": {
            backgroundColor: "#c62828",
          },
          padding: 1.5,
        }}
      >
        Reserve Now
      </Button>

      <Divider sx={{ marginY: 2 }} />

      {/* Pricing Breakdown */}
      <PricingBreakdown price={price} />
    </Box>
  );
};

BookingCard.propTypes = {
  price: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default BookingCard;
