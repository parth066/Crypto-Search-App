import React from 'react'
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from 'react-router-dom'







function Navbar() {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            }
        },
        type: "dark"
    })

    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();
    console.log(currency);



    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            style={{ flex: 1, fontWeight: "bold", color: "gold", cursor:"pointer" }}
                            onClick={() => navigate('/')}

                        >
                            Crypto Search
                        </Typography>
                        {/* <Button color="inherit">Login</Button> */}
                        <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: 100, height: 40, marginRight: 15 , color:"white"}}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}  >USD</MenuItem>
                            <MenuItem value={"INR"}  >INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>

    )
}

export default Navbar
