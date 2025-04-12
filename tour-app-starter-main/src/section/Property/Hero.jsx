import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Export, Heart } from "@phosphor-icons/react"; // Correct way to import
import Images from "./../Property/Images"
import Details from "./detail";

const Hero = () => {
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={8} xs={12}>
            <Typography variant="h4">
              Alpha house - design villa with full concierge service
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
                startIcon={<Heart/>}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Images/>
        <Details/>
      </Box>
    </Stack>
  );
};

export default Hero;
