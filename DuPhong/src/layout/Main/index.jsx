import { Box, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "./Header"

const MainLayout = () =>{
    return(
        <Stack spacing={2} sx={{ minHeight: '100vh' }}>
            {/* Header */}
            <Header/>
            <Box sx={{ flex: 1 }}>
                <Outlet/>
            </Box>
        </Stack>
    )
}
export default MainLayout