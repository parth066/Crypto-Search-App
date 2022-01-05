import { Container , Typography} from '@mui/material'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'


const Banner = () => {
    return (
        <div style={{ backgroundImage: "url(./banner.jpg)"}}>
            <Container style={{ height: 400, display: "flex", flexDirection: "column", paddingTop: 25, justifyContent: "space-around" }} >
                <div className='tagline'>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                        }}
                    >
                        CryptoCurrency App
                    </Typography>
                    <Typography variant='subtitle2' style = {{ color:"darkgrey", textTransform:"capitalize" }} >
                            Get all the Info regarding your favorite Crypto Currency
                    </Typography>

                </div>
                    <Carousel/>

            </Container>

        </div>
    )
}

export default Banner
