import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the SearchIcon
import useResponsive from "../../hooks/useResponsive";
import { styled } from "@mui/material/styles";
import LocationSearch from "./LocationSearch";
import {
  DateRangePicker,
  MobileDateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import { useState } from "react";
import dayjs from "dayjs";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  padding: 10,
  borderRadius: 20, // Make it round
}));

const shortcutItems = [
  {
    label: "Tuần này",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "7 ngày qua",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Tháng hiện tại",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Tháng sau",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Đặt lại", getValue: () => [null, null] },
];

const Inputt = () => {
  const isMobile = useResponsive("down", "md");
  const [value, setValue] = useState([null, null]); // Default state for the date range

  return (
    <Box sx={{ px: { xs: 2, md: 0 } }}>
      <Card sx={{ padding: 2, borderRadius: 3 }}>
        {" "}
        {/* Rounded corners for the card */}
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: isMobile ? "80vw" : 720 }}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Stack spacing={{ xs: 1, md: 0 }} alignItems="center">
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Điểm đến
                  </Typography>
                  {/* Location search */}
                  <LocationSearch />
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={0.2}
                >
                  <Divider orientation="vertical" sx={{ height: 40 }} />
                  <Stack
                    spacing={{ xs: 1, md: 0 }}
                    sx={{ width: "100%" }}
                    alignItems="center"
                  >
                    <Typography variant="subtitle2">
                      Ngày nhận-trả phòng
                    </Typography>
                    {isMobile ? (
                      <MobileDateRangePicker
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(starProps, endProps) => (
                          <>
                            <TextField
                              {...starProps}
                              label=""
                              sx={{ borderRadius: 10 }}
                            />
                            <TextField
                              {...endProps}
                              label=""
                              sx={{ borderRadius: 10 }}
                            />
                          </>
                        )}
                      />
                    ) : (
                      <DateRangePicker
                        slots={{
                          field: SingleInputDateRangeField,
                          textField: TextField,
                        }}
                        slotProps={{
                          shortcuts: {
                            items: shortcutItems,
                          },
                          textField: {
                            fullWidth: true,
                            variant: "standard",
                            InputProps: {
                              disableUnderline: true,
                            },
                          },
                        }}
                        sx={{ width: "100%" }}
                        disablePast
                        name="alowwedRange"
                      />
                    )}
                  </Stack>
                  <Divider orientation="vertical" sx={{ height: 40 }} />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <StyledIconButton>
            <SearchIcon />
          </StyledIconButton>
        </Stack>
      </Card>
    </Box>
  );
};

export default Inputt;
