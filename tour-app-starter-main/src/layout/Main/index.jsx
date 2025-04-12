import { Box, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "./Header"

const MainLayout = () =>{
    return(
        <Stack spacing={2}>
            {/* Header */}
            <Header/>
            <Box sx={{ overflowY: "scroll",height: "Calc(100vh-150px)"}}>
            {/*  */}
            <Outlet/>
            </Box>
        </Stack>
    )
}
export default MainLayout