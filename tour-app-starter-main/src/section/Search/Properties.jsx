import { Card, CardMedia, Grid, Box } from "@mui/material";

const Properties = ({ properties }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.imageUrl}
                  alt={property.name}
                />
                <Box sx={{ padding: 2 }}>
                  <h3>{property.name}</h3>
                  <p>{property.description}</p>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </Grid>
    </Box>
  );
};

export default Properties;
