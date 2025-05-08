import React from "react"; 
import {
  Box,
  Typography,
  Stack,
  IconButton,
  TextField,
  Divider,
  Popover,
} from "@mui/material";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import PropTypes from "prop-types";

const Guest = () => {
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
      const newCount = Math.max(0, prev[type] + change);
      return { ...prev, [type]: newCount };
    });
  };

  const displayGuests = `${guest.adults} Adults, ${guest.children} Children, ${guest.infants} Infants, ${guest.pets} Pets`;

  return (
    <>
      <Stack spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", textAlign: "center" }}
        >
          Guest Info
        </Typography>        import React from "react";
        import {
          Box,
          Typography,
          Stack,
          IconButton,
          TextField,
          Divider,
          Popover,
        } from "@mui/material";
        import { RemoveCircle, AddCircle } from "@mui/icons-material";
        import PropTypes from "prop-types";
        
        const GuestSelector = ({ guests, setGuests }) => {
          const [anchorEl, setAnchorEl] = React.useState(null);
        
          const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
          };
        
          const handleClose = () => {
            setAnchorEl(null);
          };
        
          const handleGuestsChange = (type, change) => {
            setGuests((prev) => {
              const newCount = Math.max(0, prev[type] + change);
              return { ...prev, [type]: newCount };
            });
          };
        
          const totalGuests = guests.adults + guests.children;
          const displayGuests = `${totalGuests} người`;
        
          return (
            <>
              <Stack spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Số lượng khách
                </Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    padding: "10px 15px",
                    backgroundColor: "#333",
                    borderRadius: "25px",
                    cursor: "pointer",
                    marginTop: 2,
                  }}
                  onClick={handleClick}
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
                <Stack spacing={2} sx={{ px: 4, py: 2 }}>
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
                        <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                          {label}
                        </Typography>
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
            </>
          );
        };
        
        GuestSelector.propTypes = {
          guests: PropTypes.shape({
            adults: PropTypes.number.isRequired,
            children: PropTypes.number.isRequired,
          }).isRequired,
          setGuests: PropTypes.func.isRequired,
        };
        
        export default GuestSelector;        import React from "react";
        import {
          Box,
          Typography,
          Stack,
          IconButton,
          TextField,
          Divider,
          Popover,
        } from "@mui/material";
        import { RemoveCircle, AddCircle } from "@mui/icons-material";
        import PropTypes from "prop-types";
        
        const GuestSelector = ({ guests, setGuests }) => {
          const [anchorEl, setAnchorEl] = React.useState(null);
        
          const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
          };
        
          const handleClose = () => {
            setAnchorEl(null);
          };
        
          const handleGuestsChange = (type, change) => {
            setGuests((prev) => {
              const newCount = Math.max(0, prev[type] + change);
              return { ...prev, [type]: newCount };
            });
          };
        
          const totalGuests = guests.adults + guests.children;
          const displayGuests = `${totalGuests} người`;
        
          return (
            <>
              <Stack spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                  Số lượng khách
                </Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    padding: "10px 15px",
                    backgroundColor: "#333",
                    borderRadius: "25px",
                    cursor: "pointer",
                    marginTop: 2,
                  }}
                  onClick={handleClick}
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
                <Stack spacing={2} sx={{ px: 4, py: 2 }}>
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
                        <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                          {label}
                        </Typography>
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
            </>
          );
        };
        
        GuestSelector.propTypes = {
          guests: PropTypes.shape({
            adults: PropTypes.number.isRequired,
            children: PropTypes.number.isRequired,
          }).isRequired,
          setGuests: PropTypes.func.isRequired,
        };
        
        export default GuestSelector;
        <Box
          sx={{
            display: "inline-block",
            padding: "10px 15px",
            backgroundColor: "#333",
            borderRadius: "25px",
            cursor: "pointer",
            marginTop: 2,
          }}
          onClick={handleClick}
        >
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {displayGuests}
          </Typography>
        </Box>
      </Stack>

      {/* Popover for Selecting Guests */}
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
          {/* Guest Sections */}
          {["adults", "children", "infants", "pets"].map((type) => (
            <React.Fragment key={type}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => handleGuestsChange(type, -1)}
                    disabled={guest[type] === 0}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <TextField
                    disabled
                    value={guest[type]}
                    type="number"
                    sx={{ width: 40, textAlign: "center" }}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => handleGuestsChange(type, 1)}
                  >
                    <AddCircle />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}

          {/* Display All Guest Information */}
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {displayGuests}
          </Typography>
        </Stack>
      </Popover>
    </>
  );
};

export default GuestSelector;
