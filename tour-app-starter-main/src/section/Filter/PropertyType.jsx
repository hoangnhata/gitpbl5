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
        Loại tài sản
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
                  Nhà riêng
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }}
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
                  Khách sạn
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }}
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
                  Nhà nghỉ
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }}
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
                  Căn hộ
                </Typography>
              </Stack>
              <FormControlLabel
                control={<Checkbox size="small" />}
                label=""
                sx={{ ml: "auto" }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default PropertyType;
