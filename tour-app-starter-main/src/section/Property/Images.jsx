import { Box, Button, Grid } from "@mui/material";
import Image from "../../components/Image";
import { ImageSquare } from "@phosphor-icons/react";

const images = [
  "https://homes-and-villas.marriott.com/hvmb-pictures/40311112/638324213186183413.jpg",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1",
  "https://amazingarchitecture.com/storage/711/Deep-Villa-Atrey-and-Associates-New-Delhi-ndia-Amazing-Architecture-House.jpg",
  "https://dlifeinteriors.com/wp-content/uploads/2022/12/Villa-Projects-in-Bengaluru-1024x683.jpg",
  "https://acihome.vn/uploads/15/thiet-ke-khach-san-hien-dai-co-cac-ban-cong-view-bien-sieu-dep-seaside-mirage-hotel-3.JPG",
];

const Images = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        position: "relative,",
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={6}>
          <Image src={images[1]} alt="Villa" sx={{ height: 1 }} />
        </Grid>
        <Grid container item md={6} spacing={2}>
          <Grid item md={6}>
            <Image src={images[1]} alt="Villa" sx={{ height: 1 }} />
          </Grid>
          <Grid item md={6}>
            <Image src={images[1]} alt="Villa" sx={{ height: 1 }} />
          </Grid>
          <Grid item md={6}>
            <Image src={images[3]} alt="Villa" sx={{ height: 1 }} />
          </Grid>
          <Grid item md={6}>
            <Box sx={{ position: "relative" }}>
              <Image
                src={images[3]}
                alt="Villa"
                sx={{ width: "100%", height: "auto" }}
              />
              <Button
                startIcon={<ImageSquare weight="bold"/> }
                color="inherit"
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: (theme) => theme.palette.grey[400],
                }}
              >
                Show all photos
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Images;
