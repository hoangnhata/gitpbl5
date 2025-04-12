import { Avatar, Box, Stack } from "@mui/material"
import Logo from "../../components/Logo"
import Inputt from "./Inputt"
import {faker} from "@faker-js/faker"

const Header = () =>{
    return(
        <Stack spacing={2}>
            <Box sx={{boxShadow:"0px 2px 4x rgba(0,0,0,0.1"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{px:3 , py: 2}}>
                    {/* Logo */}
                    <Logo/>
                    {/* Input */}
                    <Inputt/>
                    {/* avatar */}
                    <Avatar alt={faker.person.fullName()} src={faker.image.avatar} />
                </Stack>
            </Box>
        </Stack>
    )
}
export default Header