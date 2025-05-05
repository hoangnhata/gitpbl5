import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Export, Heart } from "@phosphor-icons/react"; // Correct way to import
import Images from "./../Property/Images"; // Import Images component
import Details from "./detail"; // Import Details component

const Hero = ({ property }) => {
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={8} xs={12}>
            <Typography variant="h4">{property.title}</Typography>          
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {property.avgStart} stars - {property.price} VND / Night
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end" md={4} xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                startIcon={<Export />}
                sx={{ textDecoration: "underline" }}
                color="primary"
              >
                Share
              </Button>
              <Button
                sx={{ textDecoration: "underline" }}
                color="primary"
                startIcon={<Heart />}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* Pass property data to Images and Details components */}
        <Images images={property.images} />  {/* Truyền hình ảnh vào Images */}
        <Details property={property} /> 
      </Box>
    </Stack>
  );
};

export default Hero;
