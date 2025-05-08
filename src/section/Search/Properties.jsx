import { Card, Grid, Box, Typography, IconButton } from "@mui/material";
import Slider from "react-slick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom"; // Import Link for routing

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Properties = ({ properties }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Link
                to={`/property/${property.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    position: "relative",
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <Slider {...settings}>
                    {property.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={`http://localhost:8080/${image}`}
                          alt={`Image ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                  {property.popular && (
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: "#f0f0f0",
                        color: "#000000",
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "35px",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      Được khách yêu thích
                    </Typography>
                  )}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      borderRadius: "50%",
                      padding: 1,
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                  <Box sx={{ padding: 2 }}>
                    <Box sx={{ height: 10 }} /> {/* Added spacing */}
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "1.1rem", fontWeight: 600 }}
                      gutterBottom
                    >
                      {property.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ marginBottom: 1 }}
                    >
                      {property.address}, {property.country}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 1,
                      }}
                    >
                      <StarIcon sx={{ color: "gold", fontSize: 18 }} />
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{ marginLeft: 0.5 }}
                      >
                        {property.avgStart} sao
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {property.price} VND / đêm
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      sx={{ marginTop: 1 }}
                    >
                      <strong>Khả dụng từ:</strong> {property.startDate} đến{" "}
                      {property.endDate}
                    </Typography>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography>Không có bất động sản</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Properties;
