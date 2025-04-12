import { Container, Stack } from "@mui/material";
import { Hero } from "../section/Property";

const Property = () =>{
    return (
        <Container sx={{py:4}}>
            <Stack spacing={4}>
                {/* Hero */}
                <Hero/>
                {/* Details */}
            </Stack>
        </Container>
    )
}

export default Property;