import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PricingBreakdown = ({ price }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography
        variant="body2"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        ₹{price} x 3 nights <span>₹{price * 3}</span>
      </Typography>
      <Typography
        variant="body2"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        Service Fee <span>₹572</span>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 1,
        }}
      >
        Total <span>₹{price * 3 + 572}</span>
      </Typography>
    </Box>
  );
};

PricingBreakdown.propTypes = {
  price: PropTypes.number.isRequired,
};

export default PricingBreakdown;
