import { Chip, Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/material";
import { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import CardView from "./CardView";
import { FaColumns, FaMap } from 'react-icons/fa';
import Map from "./Map";
import  {countries as COUNTRIES} from "../../_mock/map/countries";
import { MAPBOX_API } from "../../config";

const THEMES = {
    streets: "mapbox://styles/mapbox/streets-v11",
    outdoors: "mapbox://styles/mapbox/outdoors-v11",
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
    satellite: "mapbox://styles/mapbox/satellite-v9",
    satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
  };

const baseSettings = {
    mapboxAccessToken: MAPBOX_API,
    width: '100%',
    height: '100%',
    minZoom:1 
}

const Result = () => {
    const [view, setView] = useState("card");
    const [tabValue, setTabValue] = useState(0);  // Thêm state để quản lý tab đang chọn
    const isDesktop = useResponsive("up", "md");

    // Hàm xử lý thay đổi tab
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue); // Cập nhật giá trị tab khi người dùng thay đổi tab
    };

    return (
        <Stack sx={{ px: 3, py: 2 }} spacing={2}>
            <Box>
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Typography
                            variant="body2"
                            textAlign={{ xs: "center", md: "start" }}
                            sx={{ fontWeight: 600 }}z
                        >
                            Found 100 more results based on your search
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent={isDesktop ? "flex-end" : "center"} md={6} xs={12}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Chip
                                onClick={() => {
                                    setView('map');
                                }}
                                sx={{ p: 1 }}
                                color="primary"
                                variant={view === "map" ? "filled" : "outlined"}
                                label={<Typography variant="subtitle2">Map view</Typography>}
                                icon={<FaMap size={20} weight="bold" />}
                            />
                            <Chip
                                onClick={() => {
                                    setView('card');
                                }}
                                sx={{ p: 1 }}
                                color="primary"
                                variant={view === "card" ? "filled" : "outlined"}
                                label={<Typography variant="subtitle2">Card view</Typography>}
                                icon={<FaColumns size={20} />}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            {view === 'map' ? (
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                        <CardView view={view} value={tabValue} handleChangeTab={handleChangeTab} />  
                        </Grid>
                        <Grid item md={6} xs={12}>
                            {/* Map vỉew */}
                            <Map {...baseSettings} data={COUNTRIES} mapStyle={THEMES.outdoors} />
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <CardView view={view} value={tabValue} handleChangeTab={handleChangeTab} />  
            )}
        </Stack>
    );
};

export default Result;
