import React from "react";
import { Box, Typography } from "@mui/material";

const PropertyDescription = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: 2,
        borderLeft: {
          md: "1px solid rgba(255,255,255,0.1)",
          xs: "none",
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#e0e0e0",
          lineHeight: 1.8,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        One of the most loved homes on Airbnb based on ratings, reviews, and
        reliability
      </Typography>
    </Box>
  );
};

export default PropertyDescription;
