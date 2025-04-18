import { Box, Card, Stack, Typography, Button, Divider } from "@mui/material";
import TypeOfPlace from "./TypeOfPlace";
import PriceRange from "./PriceRange";
import RoomAndBeds from "./RoomAndBeds";
import PropertyType from "./PropertyType";
import Amenities from "./Amenties";
import BookingOptions from "./BookingOptions";

const Filter = () => {
  return (
    <Box sx={{ py: 4, pl: 1 }}>
      <Card sx={{ width: 1, pb: 3 }}>
        <Box
          sx={{
            mb: 2,
            py: 2,
            px: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle1">Filter</Typography>
            <Button size="small">Clear all filters</Button>
          </Stack>
        </Box>
        <Stack spacing={2} sx={{ px: 3 }}>
          {/* type of place */}
          <TypeOfPlace />
          <Divider />
          {/* price range */}
          <PriceRange />
          <Divider />
          {/* No , of room , bed & baths */}
          <RoomAndBeds />
          <Divider />
          {/* Property */}
          <PropertyType />
          <Divider />
          {/* Amenities */}
          <Amenities />
          <Divider />
          {/* BookingOptions */}
          <BookingOptions />
        </Stack>
      </Card>
    </Box>
  );
};

export default Filter;
