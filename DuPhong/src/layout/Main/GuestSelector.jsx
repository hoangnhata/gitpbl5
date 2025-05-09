import {
  Divider,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RemoveCircle, AddCircle } from "@mui/icons-material";

const GuestSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [guest, setGuests] = useState({
    adults: 2,
    children: 1,
    infants: 1,
    pets: 1,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGuestsChange = (type, change) => {
    setGuests((prev) => {
      const newCount = Math.max(0, prev[type] + change); // Prevent going below 0
      return { ...prev, [type]: newCount };
    });
  };

  const displayGuests = `${guest.adults} Adults, ${guest.children} Children, ${guest.infants} Infants, ${guest.pets} Pets`;

  return (
    <>
      <TextField
        onClick={handleClick}
        fullWidth
        value={displayGuests}
        placeholder="Enter guest details"
        variant="standard"
        InputProps={{
          disableUnderline: true,
          readOnly: true,
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} sx={{ px: 4, py: 2 }}>
          <Stack spacing={2}>
            {/* Adults Section */}
            <Stack
              sx={{ width: 300 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Adults
                </Typography>
                <Typography variant="caption">Age 13 or above</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("adults", -1)}
                  disabled={guest.adults === 0}
                >
                  <RemoveCircle />
                </IconButton>
                <TextField
                  disabled
                  value={guest.adults}
                  type="number"
                  style={{ width: "40px", textAlign: "center" }}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("adults", 1)}
                >
                  <AddCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />

            {/* Children Section */}
            <Stack
              sx={{ width: 300 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Children
                </Typography>
                <Typography variant="caption">Ages 2-12</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("children", -1)}
                  disabled={guest.children === 0}
                >
                  <RemoveCircle />
                </IconButton>
                <TextField
                  disabled
                  value={guest.children}
                  type="number"
                  style={{ width: "40px", textAlign: "center" }}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("children", 1)}
                >
                  <AddCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />

            {/* Infants Section */}
            <Stack
              sx={{ width: 300 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Infants
                </Typography>
                <Typography variant="caption">Under 2</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("infants", -1)}
                  disabled={guest.infants === 0}
                >
                  <RemoveCircle />
                </IconButton>
                <TextField
                  disabled
                  value={guest.infants}
                  type="number"
                  style={{ width: "40px", textAlign: "center" }}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("infants", 1)}
                >
                  <AddCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />

            {/* Pets Section */}
            <Stack
              sx={{ width: 300 }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Pets
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("pets", -1)}
                  disabled={guest.pets === 0}
                >
                  <RemoveCircle />
                </IconButton>
                <TextField
                  disabled
                  value={guest.pets}
                  type="number"
                  style={{ width: "40px", textAlign: "center" }}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleGuestsChange("pets", 1)}
                >
                  <AddCircle />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />

            {/* Display all guest information */}
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {displayGuests}
            </Typography>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default GuestSelector;
