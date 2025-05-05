import {
  Box,
  InputLabel,
  Stack,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { House, Apartment, Hotel, BeachAccess } from "@mui/icons-material";

const PropertyType = () => {
  return (
    <Stack spacing={2}>
      <InputLabel
        sx={{
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Property Type
      </InputLabel>
      <Box>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <House sx={{ fontSize: 20 }} />
                <Typography variant="caption" sx={{ fontSize: 13 }}>
                  House
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }} // Move the checkbox to the right
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Hotel sx={{ fontSize: 20 }} />
                <Typography variant="caption" sx={{ fontSize: 13 }}>
                  Hotel
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }} // Move the checkbox to the right
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <BeachAccess sx={{ fontSize: 20 }} />
                <Typography variant="caption" sx={{ fontSize: 13 }}>
                  Guesthouse
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }} // Move the checkbox to the right
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Apartment sx={{ fontSize: 20 }} />
                <Typography variant="caption" sx={{ fontSize: 13 }}>
                  Apartment
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }} // Move the checkbox to the right
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default PropertyType;
