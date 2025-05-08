import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
  TextField,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import DateRangeSelector from "./DateRangeSelector";
import PricingBreakdown from "./PricingBreakdown";
import PropTypes from "prop-types";

const BookingCard = ({
  id,
  price,
  startDate,
  endDate,
  images,
  title,
  avgStart,
  reviews,
  popular,
}) => {
  const [value, setValue] = useState([null, null]);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGuestsChange = (type, change) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };

  const handleReserveClick = () => {
    if (!value[0] || !value[1]) {
      alert("Vui lòng chọn ngày nhận phòng và trả phòng");
      return;
    }

    const totalGuests = guests.adults + guests.children;
    const numberOfNights = Math.ceil(
      (value[1] - value[0]) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = price * numberOfNights;
    const serviceFee = Math.round(totalPrice * 0.1);

    navigate("/reservation", {
      state: {
        roomData: {
          id: id,
          price,
          checkIn: value[0].toISOString().split("T")[0],
          checkOut: value[1].toISOString().split("T")[0],
          guests: totalGuests,
          guestDetails: guests,
          numberOfNights,
          totalPrice,
          serviceFee,
          finalTotal: totalPrice + serviceFee,
          images: images,
          title: title,
          avgStart: avgStart,
          reviews: reviews,
          popular: popular,
        },
      },
    });
  };

  const totalGuests = guests.adults + guests.children;
  const displayGuests = `${totalGuests} người`;

  return (
    <Box sx={{ p: 3, bgcolor: "#2d2d2d", color: "white", borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        ₹{price} / đêm
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <DateRangeSelector
        value={value}
        setValue={setValue}
        startDate={startDate}
        endDate={endDate}
      />

      <Divider sx={{ my: 2 }} />

      {/* Guest Selector */}
      <Stack spacing={1} alignItems="center">
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          Số lượng khách
        </Typography>
        <Box
          onClick={handleClick}
          sx={{
            display: "inline-block",
            padding: "10px 15px",
            bgcolor: "#333",
            borderRadius: "25px",
            cursor: "pointer",
          }}
        >
          <Typography variant="body2">{displayGuests}</Typography>
        </Box>
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          {[
            { type: "adults", label: "Người lớn" },
            { type: "children", label: "Trẻ em" },
          ].map(({ type, label }) => (
            <React.Fragment key={type}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={3}
              >
                <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => handleGuestsChange(type, -1)}
                    disabled={guests[type] === 0}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <TextField
                    disabled
                    value={guests[type]}
                    sx={{ width: 40, textAlign: "center" }}
                  />
                  <IconButton onClick={() => handleGuestsChange(type, 1)}>
                    <AddCircle />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
      </Popover>

      <Divider sx={{ my: 2 }} />

      <Button
        fullWidth
        variant="contained"
        onClick={handleReserveClick}
        sx={{
          bgcolor: "#e53935",
          "&:hover": { bgcolor: "#c62828" },
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        Đặt ngay
      </Button>

      <Divider sx={{ my: 2 }} />

      <PricingBreakdown
        price={price}
        nights={
          value[0] && value[1]
            ? Math.ceil((value[1] - value[0]) / (1000 * 60 * 60 * 24))
            : 0
        }
      />
    </Box>
  );
};

BookingCard.propTypes = {
  id: PropTypes.number.isRequired, 
  price: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  avgStart: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  popular: PropTypes.bool,
};

export default BookingCard;
