import { Chip, Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useResponsive from "../../hooks/useResponsive";
import CardView from "./CardView";
import { FaColumns, FaMap } from "react-icons/fa";
import Map from "./Map";

const Result = ({ properties }) => {
  const [view, setView] = useState("card");
  const [tabValue, setTabValue] = useState(0);
  const [mapProperties, setMapProperties] = useState([]);
  const isDesktop = useResponsive("up", "md");

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // Process properties data for the map
  useEffect(() => {
    if (properties && properties.length > 0) {
      // Make sure each property has the required fields for the map
      const processedProperties = properties.map((property) => ({
        ...property,
        // Ensure these fields exist
        id: property.id || "",
        latitude: property.latitude || DEFAULT_CENTER.lat,
        longitude: property.longitude || DEFAULT_CENTER.lng,
        name: property.name || property.title || "Property",
        price: property.price || 0,
        address: property.address || "Address not available",
      }));
      setMapProperties(processedProperties);
    } else {
      setMapProperties([]);
    }
  }, [properties]);

  return (
    <Stack sx={{ px: 3, py: 2 }} spacing={2}>
      <Box>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Typography
              variant="body2"
              textAlign={{ xs: "center", md: "start" }}
              sx={{ fontWeight: 600 }}
            >
              Tìm thấy {properties?.length || 0} kết quả dựa trên tìm kiếm của
              bạn
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={isDesktop ? "flex-end" : "center"}
            md={6}
            xs={12}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                onClick={() => {
                  setView("map");
                }}
                sx={{ p: 1 }}
                color="primary"
                variant={view === "map" ? "filled" : "outlined"}
                label={<Typography variant="subtitle2">Xem bản đồ</Typography>}
                icon={<FaMap size={20} weight="bold" />}
              />
              <Chip
                onClick={() => {
                  setView("card");
                }}
                sx={{ p: 1 }}
                color="primary"
                variant={view === "card" ? "filled" : "outlined"}
                label={<Typography variant="subtitle2">Xem thẻ</Typography>}
                icon={<FaColumns size={20} />}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {view === "map" ? (
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <CardView
                properties={properties}
                view={view}
                value={tabValue}
                handleChangeTab={handleChangeTab}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Map data={mapProperties} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CardView
          properties={properties}
          view={view}
          value={tabValue}
          handleChangeTab={handleChangeTab}
        />
      )}
    </Stack>
  );
};

// Default center coordinates (Hanoi)
const DEFAULT_CENTER = {
  lat: 21.0285,
  lng: 105.8542,
};

Result.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      address: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
};

export default Result;
