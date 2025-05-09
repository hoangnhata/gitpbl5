import React from "react";
import { Grid, Stack, Typography, TextField } from "@mui/material";
import {
  DateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const DateRangeSelector = ({ value, setValue, startDate, endDate }) => {
  // Convert API dates to dayjs objects
  const minDate = dayjs(startDate);
  const maxDate = dayjs(endDate);

  const shortcutItems = [
    {
      label: "Full Available Period",
      getValue: () => [minDate, maxDate],
    },
    {
      label: "First Week",
      getValue: () => [
        minDate,
        minDate.add(7, "days").isAfter(maxDate)
          ? maxDate
          : minDate.add(7, "days"),
      ],
    },
    {
      label: "Last Week",
      getValue: () => [
        maxDate.subtract(7, "days").isBefore(minDate)
          ? minDate
          : maxDate.subtract(7, "days"),
        maxDate,
      ],
    },
    { label: "Reset", getValue: () => [null, null] },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Select Dates ({minDate.format("MMM D, YYYY")} -{" "}
            {maxDate.format("MMM D, YYYY")})
          </Typography>
          <DateRangePicker
            slots={{
              field: SingleInputDateRangeField,
              textField: TextField,
            }}
            slotProps={{
              shortcuts: { items: shortcutItems },
              textField: {
                fullWidth: true,
                variant: "outlined",
                InputProps: { disableUnderline: true },
              },
            }}
            sx={{ width: "100%" }}
            minDate={minDate}
            maxDate={maxDate}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

DateRangeSelector.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

DateRangeSelector.defaultProps = {
  value: [null, null],
};

export default DateRangeSelector;
