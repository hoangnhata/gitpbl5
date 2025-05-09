import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";

const defaultHost = {
  name: "Prateek",
  reviews: 473,
  rating: 4.26,
  yearsHosting: 8,
  languages: ["English", "French", "Hindi"],
  location: "Jaipur, India",
  description:
    "Hi All! I am Prateek Jain C/O Le Pensions Stays & Enterprises Pvt Ltd. By qualification, I am a chartered Accountant from The Institute of Chartered Accountants of India. But at heart, I have always been an entrepreneur. Our team has a collective experience of more than 24 years in hospitality and we love what we do. Le Pension Stays is a brand that stands for comfort, safety, and a memorable experience.",
  avatar: "https://ui-avatars.com/api/?name=Prateek&background=random",
};

const MAX_DESC = 180;

const HostInfo = ({ host }) => {
  const data = host || defaultHost;
  const [showMore, setShowMore] = useState(false);
  const desc = data.description;
  const isLong = desc.length > MAX_DESC;
  const displayDesc =
    showMore || !isLong ? desc : desc.slice(0, MAX_DESC) + "...";

  return (
    <Card
      sx={{
        my: 3,
        boxShadow: 3,
        borderRadius: 3,
        p: 2,
        color: "#fff",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              src={data.avatar}
              alt={data.name}
              sx={{ width: 90, height: 90, fontSize: 36, bgcolor: "#222" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ color: "#fff" }}>
                {data.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#aaa", mb: 1 }}>
                Host
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {data.reviews}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    Reviews
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderColor: "#333" }}
                />
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {data.rating}
                  </Typography>
                  <StarIcon sx={{ color: "#FFD700", fontSize: 18, ml: 0.5 }} />
                  <Typography variant="caption" sx={{ color: "#aaa", ml: 0.5 }}>
                    Rating
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, borderColor: "#333" }}
                />
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {data.yearsHosting} Years
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#aaa" }}>
                    Hosting
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, borderColor: "#333" }} />
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <LanguageIcon sx={{ color: "#aaa" }} />
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Speaks {data.languages.join(", ")}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <LocationOnIcon sx={{ color: "#aaa" }} />
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Lives in {data.location}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "#fff", mb: 1 }}>
          {displayDesc}
          {isLong && (
            <Button
              size="small"
              sx={{
                color: "#ff385c",
                textTransform: "none",
                ml: 1,
                fontWeight: 600,
              }}
              endIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setShowMore((v) => !v)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

HostInfo.propTypes = {
  host: PropTypes.shape({
    name: PropTypes.string,
    reviews: PropTypes.number,
    rating: PropTypes.number,
    yearsHosting: PropTypes.number,
    languages: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default HostInfo;
