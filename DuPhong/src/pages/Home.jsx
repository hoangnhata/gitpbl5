import { Box, Container, Grid } from "@mui/material";
import { SearchResults } from "../section/Search";
import Filter from "../section/Filter";

const Home = () => {
    return (
        <Container maxWidth="xl">
            <Box>
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <Filter />
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <SearchResults />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;